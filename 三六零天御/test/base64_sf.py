import base64
from Crypto.PublicKey import RSA

# 模拟 _0x4070dc.vConfig.k（Base64 编码的公钥）
# 这里使用一个示例 Base64 编码的公钥，实际应从服务器获取
base64_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn5D8Y6f3f7j8m6e4f3f2..."


# 模拟 _0x145c35（加密对象）
class Encryptor:
    def __init__(self):
        self.public_key = None

    def setPublicKey(self, public_key: str):
        """设置公钥，模拟 JSEncrypt 的 setPublicKey"""
        try:
            # 存储公钥（转换为 RSA 格式）
            self.public_key = RSA.import_key(public_key)
            print("Public key set successfully")
        except Exception as e:
            print(f"Error setting public key: {e}")


# 模拟 atob：Base64 解码
def atob(base64_string: str) -> str:
    try:
        # Base64 解码并转换为字符串
        decoded_bytes = Tupbase64.b64decode(base64_string)
        return decoded_bytes.decode('ascii')
    except Exception as e:
        print(f"Base64 decode error: {e}")
        return ""


# 主逻辑：解码公钥并设置
encryptor = Encryptor()
decoded_key = atob(base64_public_key)  # 模拟 atob(_0x4070dc.vConfig.k)
encryptor.setPublicKey(decoded_key)  # 模拟 _0x145c35.setPublicKey
