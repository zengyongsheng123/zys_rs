import os
import sys
import threading
import requests
import subprocess
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm
import time
import shutil

# 配置日志以避免彩色输出
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

# HTTP 请求头
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://appc6mf2yvt7087.xet.citv.cn",
    "Pragma": "no-cache",
    "Referer": "https://appc6mf2yvt7087.xet.citv.cn/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}

# 请求参数
params = {
    "": "",
    "sign": "28cf38b84933103a090e6dff7b79905a",
    "t": "68212351",
    "us": "ZRgbBfnHWA"
}

# 共享标志以在 404 时停止下载
stop_download = False
stop_lock = threading.Lock()


def check_ffmpeg():
    """检查 FFmpeg 是否可用"""
    return shutil.which("ffmpeg") is not None


def download_segment(page, output_dir="segments", max_retries=3):
    """下载单个 .ts 片段，支持重试逻辑"""
    global stop_download
    with stop_lock:
        if stop_download:
            return False, page

    url = f"https://v-tos-k.xiaoeknow.com/e8cef789f80147148ac601b99202db0a/522ff1e0vodcq1252524126/b66ef5911253642698745456933/playlist_eof/main_{page}.ts"
    output_path = os.path.join(output_dir, f"{page}.ts")

    for attempt in range(max_retries):
        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            if response.status_code == 200:
                with open(output_path, "wb") as f:
                    f.write(response.content)
                return True, page
            elif response.status_code == 404:
                logging.info(f"片段 {page} 未找到 (404)。停止所有下载。")
                with stop_lock:
                    stop_download = True
                return False, page
            else:
                logging.warning(f"下载片段 {page} 失败。状态码: {response.status_code}")
                time.sleep(2 ** attempt)  # 指数退避
        except requests.RequestException as e:
            logging.error(f"下载片段 {page} 时出错: {e}")
            time.sleep(2 ** attempt)

    logging.error(f"片段 {page} 达到最大重试次数。跳过。")
    return False, page


def concatenate_segments(segment_dir="segments", output_file="output.mp4"):
    """使用 FFmpeg 将 .ts 文件合并为单个 .mp4 文件"""
    if not check_ffmpeg():
        logging.error("FFmpeg 未安装或未添加到 PATH。请安装 FFmpeg 并确保其在 PATH 中。")
        return False

    try:
        # 获取按顺序排列的 .ts 文件列表
        ts_files = [f for f in os.listdir(segment_dir) if f.endswith(".ts")]
        ts_files.sort(key=lambda x: int(x.split(".")[0]))  # 按页面编号排序

        if not ts_files:
            logging.error("未找到用于合并的 .ts 文件。")
            return False

        # 创建临时文件，列出所有 .ts 文件
        concat_file = "concat_list.txt"
        with open(concat_file, "w", encoding="utf-8") as f:
            for ts_file in ts_files:
                f.write(f"file '{os.path.join(segment_dir, ts_file)}'\n")

        # 使用 FFmpeg 通过 subprocess 合并
        ffmpeg_cmd = [
            "ffmpeg",
            "-f", "concat",
            "-safe", "0",
            "-i", concat_file,
            "-c", "copy",
            "-loglevel", "error",
            output_file
        ]
        subprocess.run(ffmpeg_cmd, check=True)

        # 清理临时合并文件
        os.remove(concat_file)

        # 清理 .ts 文件
        for ts_file in ts_files:
            os.remove(os.path.join(segment_dir, ts_file))

        logging.info(f"视频成功合并为 {output_file}")
        return True

    except subprocess.CalledProcessError as e:
        logging.error(f"FFmpeg 合并时出错: {e}")
        return False
    except Exception as e:
        logging.error(f"合并过程中出错: {e}")
        return False


def main(max_pages=1000000, max_workers=10, output_dir="segments", output_file="output.mp4"):
    """主函数，用于下载和合并视频片段"""
    global stop_download
    stop_download = False  # 重置停止标志

    # 创建输出目录（如果不存在）
    os.makedirs(output_dir, exist_ok=True)

    # 使用线程池下载片段
    downloaded_segments = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(download_segment, page, output_dir): page for page in range(max_pages)}
        with tqdm(total=max_pages, desc="下载片段", unit="片段") as pbar:
            for future in as_completed(futures):
                success, page = future.result()
                pbar.update(1)
                if stop_download:
                    # 取消剩余任务
                    for f in futures:
                        f.cancel()
                    break
                if success:
                    downloaded_segments.append(page)

    # 如果有下载的片段，则进行合并
    if downloaded_segments:
        logging.info("开始视频合并...")
        if concatenate_segments(output_dir, output_file):
            logging.info("处理完成！")
        else:
            logging.error("合并失败。")
    else:
        logging.error("未下载任何片段。")


if __name__ == "__main__":
    main()