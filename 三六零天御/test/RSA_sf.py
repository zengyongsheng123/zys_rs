from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import base64

class Encryptor:
    def __init__(self, public_key: str, private_key: str):
        self.public_key = RSA.import_key(base64.b64decode(public_key))
        self.private_key = RSA.import_key(base64.b64decode(private_key))

    def encrypt_long(self, data: str) -> str:
        try:
            max_attempts = 10
            for attempt in range(max_attempts):
                # 加密
                cipher = PKCS1_v1_5.new(self.public_key)
                encrypted = cipher.encrypt(data.encode())
                encrypted_b64 = base64.b64encode(encrypted).decode()

                # 解密验证
                decipher = PKCS1_v1_5.new(self.private_key)
                decrypted = decipher.decrypt(base64.b64decode(encrypted_b64), None)
                if decrypted and len(decrypted) >= 20:
                    return encrypted_b64  # 返回加密结果

            # 如果 10 次后仍失败，返回最后一次加密结果
            return encrypted_b64
        except Exception as e:
            print(f"Encryption error: {e}")
            return False

# 示例用法
public_key = "YOUR_BASE64_ENCODED_PUBLIC_KEY"
private_key = "YOUR_BASE64_ENCODED_PRIVATE_KEY"
encryptor = Encryptor(public_key, private_key)
result = encryptor.encrypt_long("example data")
print(result)
