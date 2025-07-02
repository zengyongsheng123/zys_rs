# # 实现sm 比较好的库gmssl
# from gmssl import sm2
#
# # 16 进制的公钥和私钥 private_key = '00B9AB0B828FF68872F21A837FC303668428DEA11DCD1B24429D0C99E24EED83D5' public_key =
# 'B9C9A6E04E9C91F7BA880429273747D7EF5DDEB0BB2FF6317EB00BEF331A83081A6994B8993F3F5D6EADDDB81872266C87C018FB4162F5AF347B483E24620207' sm2_crypt = sm2.CryptSM2(public_key=public_key, private_key=private_key)
#
# # 待加密数据和加密后数据为 bytes 类型
# data = b"this is the data to be encrypted"
# enc_data = sm2_crypt.encrypt(data)
# dec_data = sm2_crypt.decrypt(enc_data)
#
# print('enc_data: ', enc_data.hex())
# print('dec_data: ', dec_data)


# from gmssl import sm3, func
#
#
# def sm3_hash(message):
#     # python实现需要把编码数据转换成列表
#     hash_hex = sm3.sm3_hash(func.bytes_to_list(message))
#     print(hash_hex)
#
#
# # main
# if __name__ == '__main__':
#     message = b"123"  # bytes类型
#     sm3_hash(message)


# gmssl基于   bytes进行加密
from gmssl import sm4, func

# 创建SM4加密对象
sm4_crypt = sm4.CryptSM4()

key = b'0123456789ABCDEF0123456789ABCDEF'

# 设置密钥
sm4_crypt.set_key(key, sm4.SM4_ENCRYPT)

# 要加密的数据
data = b"Hello, SM4!"

# 加密数据
ciphertext = sm4_crypt.crypt_ecb(func.bytes_to_list(data))

# 将加密后的数据转换为字节串
encrypted_data = bytes(func.list_to_bytes(ciphertext))

# 解密数据（如果需要）
sm4_crypt.set_key(key, sm4.SM4_DECRYPT)
decrypted_data = sm4_crypt.crypt_ecb(ciphertext)
decrypted_data = bytes(func.list_to_bytes(decrypted_data))

print("原始数据:", data.decode("utf-8"))
print("加密后的数据:", encrypted_data.hex())
print("解密后的数据:", decrypted_data.decode("utf-8"))
