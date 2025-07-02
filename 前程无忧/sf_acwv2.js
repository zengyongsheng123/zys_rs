
function decodeString(input) {
  const permutation = [15, 35, 29, 24, 33, 16, 1, 38, 10, 9, 19, 31, 40, 27, 22, 23, 25, 13, 6, 11, 39, 18, 20, 8, 14, 21, 32, 26, 2, 30, 7, 4, 17, 5, 3, 28, 34, 37, 12, 36];
  const key = '3000176000856006061501533003690027800375';
  // Step 1: 字符重排（unsbox）
  const permuted = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < permutation.length; j++) {
      if (permutation[j] === i + 1) {
        permuted[j] = input[i];
      }
    }
  }
  const permutedStr = permuted.join('');

  // Step 2: 逐字节 XOR（hexXor）
  let result = '';
  for (let i = 0; i < permutedStr.length && i < key.length; i += 2) {
    const inputByte = parseInt(permutedStr.slice(i, i + 2), 16);
    const keyByte = parseInt(key.slice(i, i + 2), 16);
    let xorResult = (inputByte ^ keyByte).toString(16);
    if (xorResult.length === 1) {
      xorResult = '0' + xorResult; // 补零
    }
    result += xorResult;
  }

  return result;
}

const input = '175DA595BFD903531F772D14FB35378B7C8BFB58';
const decoded = decodeString(input);
console.log(decoded);