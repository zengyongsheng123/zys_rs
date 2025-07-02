def decode_string(input_str):
    permutation = [15, 35, 29, 24, 33, 16, 1, 38, 10, 9, 19, 31, 40, 27, 22, 23, 25, 13, 6, 11, 39, 18, 20, 8, 14, 21,
                   32, 26, 2, 30, 7, 4, 17, 5, 3, 28, 34, 37, 12, 36]
    key = '3000176000856006061501533003690027800375'

    # Step 1: Character permutation (unsbox)
    permuted = [''] * len(permutation)
    for i in range(len(input_str)):
        for j in range(len(permutation)):
            if permutation[j] == i + 1:
                permuted[j] = input_str[i]

    permuted_str = ''.join(permuted)

    # Step 2: Byte-wise XOR (hexXor)
    result = ''
    for i in range(0, min(len(permuted_str), len(key)), 2):
        input_byte = int(permuted_str[i:i + 2], 16)
        key_byte = int(key[i:i + 2], 16)
        xor_result = input_byte ^ key_byte
        xor_hex = format(xor_result, '02x')  # Ensure two digits with leading zero if needed
        result += xor_hex

    return result


if __name__ == "__main__":
    input_str = '175DA595BFD903531F772D14FB35378B7C8BFB58'
    decoded = decode_string(input_str)
    print(decoded)