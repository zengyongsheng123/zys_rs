import hashlib


def get_sha():
    sha = hashlib.sha1()
    # sha = hashlib.sha256()    64位
    # sha = hashlib.sha512()    128位
    sha.update('1'.encode())
    print(sha.hexdigest())


get_sha()
