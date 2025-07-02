import json
import requests
import re

# Headers and URL parameters
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://geo.captcha-delivery.com/captcha/?initialCid=AHrlqAAAAAMAzx3-LhwRKbYAZ6uxxw%3D%3D&hash=2211F522B61E269B869FA6EAFFB5E1&cid=bJX2d~6zjY8F3kAO0DZXJeU3ETJxm3f4DU27MP23fyN5n6VeBCW_Jhu09FR1EMmWzrNRtjhBz0WalYdEi233e_Sf~HvD_EhQ3TDx0nlD~r_kDGS5r94JaSnNsJ467Myx&t=fe&referer=https%3A%2F%2Fwww.hermes.com%2Ffr%2Ffr%2Fproduct%2Fles-mains-hermes-vernis-email-rose-coquille-V60301VV003%2F&s=13461&e=0718edd85846c6f29436e8918f4d3522ff0c9c794672a9c30491540145b29745",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "sec-ch-ua": '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"'
}
url = "https://geo.captcha-delivery.com/captcha/"
params = {
    "initialCid": "AHrlqAAAAAMAzx3-LhwRKbYAZ6uxxw==",
    "hash": "2211F522B61E269B869FA6EAFFB5E1",
    "cid": "bJX2d~6zjY8F3kAO0DZXJeU3ETJxm3f4DU27MP23fyN5n6VeBCW_Jhu09FR1EMmWzrNRtjhBz0WalYdEi233e_Sf~HvD_EhQ3TDx0nlD~r_kDGS5r94JaSnNsJ467Myx",
    "t": "fe",
    "referer": "https://www.hermes.com/fr/fr/product/les-mains-hermes-vernis-email-rose-coquille-V60301VV003/",
    "s": "13461",
    "e": "0718edd85846c6f29436e8918f4d3522ff0c9c794672a9c30491540145b29745"
}

# Send request
try:
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()  # Check for request errors
except requests.RequestException as e:
    print(f"Request failed: {e}")
    exit(1)

# Extract image URLs
da = re.findall(r'<link rel="preload" href="(.*?)" as="image" crossorigin="anonymous">', response.text)
if len(da) < 2:
    print("Failed to extract image URLs")
    exit(1)

# Extract sliderCaptcha configuration
ppp = re.findall(r'var\s+captcha\s*=\s*sliderCaptcha\s*\(([\s\S]*?)\)\s*;', response.text)
if not ppp:
    print("Failed to extract sliderCaptcha configuration")
    exit(1)

# Clean JSON string
json_string = ppp[0]
# Replace single quotes with double quotes for string values
json_string = json_string.replace("'", '"')
# Add double quotes around keys (e.g., id: -> "id":)
json_string = re.sub(r'(\w+)(?=\s*:)', r'"\1"', json_string)
# Fix malformed URLs (remove extra quotes around "https")
json_string = re.sub(r'""https":', '"https:', json_string)

# Parse JSON
try:
    data = json.loads(f'[{json_string}]')
except json.JSONDecodeError as e:
    print(f"JSON parsing error: {e}")
    print(f"Problematic JSON string: {json_string}")
    exit(1)


# Recursive function to extract all values
def extract_values(obj, values=None):
    if values is None:
        values = []
    if isinstance(obj, dict):
        for value in obj.values():
            extract_values(value, values)
    elif isinstance(obj, list):
        for item in obj:
            extract_values(item, values)
    else:
        values.append(obj)
    return values


# Extract values from the first object
values = extract_values(data[0])

# Print extracted values
print("Extracted values:")
id = values[0]
captchaChallengeSeed = values[3]
captchaAudioChallenge = values[5]
captchaAudioChallengePath = values[6]
width = values[7]
height = values[8]
sliderL = values[9]
sliderR = values[10]
offset = values[11]
rt = values[13]
# Extract image URLs
bg_url = da[0]
slider_url = da[1]
print(bg_url, slider_url, id, captchaChallengeSeed, captchaAudioChallenge, captchaAudioChallengePath, width, height,
      sliderL, sliderR, offset, rt, sep='\t')
# Download images (uncomment to enable)
# with open("bg.png", "wb") as f:
#     f.write(requests.get(bg_url).content)
# with open("slider.png", "wb") as f:
#     f.write(requests.get(slider_url).content)
