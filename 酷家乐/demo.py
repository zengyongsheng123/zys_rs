import requests


headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.kujiale.com",
    "Pragma": "no-cache",
    "Referer": "https://www.kujiale.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://sphinx.tongdun.net/sphinx/validatecode/v1"
params = {
    "p1": "b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F^^kujia-1748435654713-e37cacd49888a8^^kujia^^kujia_web",
    "p2": "pWPHc1748435216fF0MtNKne2b^^1^^1^^1"
}
data = {
    "p3": "YLmyu8hGMa3xcLiD73up~dzrGIrwYN8YeVvRmTFiT1u5DvQcHP1K/zgp~q3Y4p6D4aeD4SdWiayvHlpkn1y2yTs62Ej~Kuh64wjVrphlh7e=",
    "p4": "/Cw7EVauZbbQMh0vkQpZJTBHmS9wnxSijKYnw2pLICjut8rrYWhOCXO2qWMMvL0wXp0VpH3yBOAf9qyBROqDjJvoGIG2y1t1wTO9LmNxLotQRD3N0B/7MBlxHW~n9da/Nks3KBy79IREQSo0Uc8VzzH4kgQTKcJ0uEWctyuXfjnxZf/p1T6W~EMdVKxByXp5Gn~SuI35OEkRrgmwHOQCbzAh2rJHXwz80lbiJT31b3IyKhKHdcR5vn3YPlhErOMiRbktUoaJ8aHohZL01hOGRE~xpJJw7UUfXqJUzb9GIWewDZtjZF6jHqR1mjx/hBZRWUVTBDpvKRKdNx78aeiTn1hgwMrInw~YKmC3X0Hl2vcuHos/uHoNHUxTnrofJ3yUshImVRTWomRMLqvVUmqe5NLCAhHDJHJa0XVeM/J7~mfcXzyyq/5zwvv2mYB~LPE8Dodr5KT6K0men0cNrVD/b18zn7l5b7jbwCv5jaYgujyXD1c51hjNBUXAmuyUDe6k1VOj~J75JjOT2B~ehztTL/ZAskG2mefs8C/Z8Id3A4FEaXshrM/YPzXyiDZW9kHeQKI0ZXZKLo1MKLDP77b4u4BgiFn0AEdr~uv9PSS6mkAWR1z8~QQ79U4vLCf17insj6GPEGXZMoQxmmUJH7PlprtBubvY//Ug31YIisFwMkgNvD9wHmS0JhuHzmKz7nukgO6fE6vseJ/EAc1B80sxsXLyu~UPzMps1Sn2HTHMoXoU5/34EMssSxIt3Xpn5lqSSCt/zzdJ5q/EuaguoQTquN9fHJQ7NcNSv9jozryezIt2PgOoFJ5yo05xWtK~sPlDkCAuBC5kFDzoOTpYmATFuQ74zvrXcVx~lQWcdnL1Nqd7lZqPZtFsYQka1Hb7rjGfk~VL1e60uLfH7CLm7FNxGG5f3XSM3jCA2hh1YOw0W/AdnDXADZbm2NTR~C5jELy11246FmNWjfgHaZDrfn6O0Io/kMULJvUGRnTTqyWHIF8SccxYrlIIsiEgE2iyQXiYGW1hvpJu1MKwhS1KVWpLn5yAvANO//JBvm0qctEHH3bqqba8wVwcKgSyJFCq6hIMQc4WGGMDm7nzecUK8fGzzSdcSbAUCszQpCGGbZE3qeVF48nA9TQ/jd591M6dsNs8Mt1p~fSKQifve3vxkegDwx06CQebGav/las0JXsNMdEGi3biu41eKUHoQqtwhEiu~7mOqenvOz3jBG7zgcK5Ii9PfkKtAR7vJ7yWjmRKr0MPjvXFsuhK1R/YRrbQ~1KKpzGYnq~h930UXBbWKQ~AWBDq0rcpgTF0fCgPt1L9jHgs~J1uzseD0BOiWL0M0s1sASlu93s3JskqDga7g4DctW2WkiYaJPW1yCbwEt1MEzbhFSSnRvKFR7x1PH4dz2~ZXp6SdQI2Te9eMX4ccv/7/FDfCZErPAKWLccbSrH3DXvbVGKGZXBEO2/xyqU6vVRNK1nv3WE9wHORSbPHI2ZQY0DXm~WqOoDUlQ~0Q1pO/DgLcumxLJRGX7x8EPs1CwWAQdeZqxeHbQycOUi4pE4Nbr8grUxFNemqcMdSRKBSNxuuZFsqKtiMRTcdKEOthqpEiJm1~I0m2x8aUvIGNDWafjwRJyjocqvNitmOvkcK/C5Y2V2rPjJldLtS7xmwzIAgNXq3hmaMKMPJ50EMFaQzmr/rCzaW28vaaHN2P6837PvMXkB271f1y4y~VZ9dXiYf~C454ACvzg0eCiRUCQN9iWTplXm~0/KIi4Rfsxi5rKZ5tg2~T5eYe2yMDO~o4bBSb4f79aEExNbp5Z5ylivt4Ow~SBhMCVNXzXqX8JCWL3Tk1Ct7e6iFEJVwo6ptduPrjNPmjhDe897h80Z6wKS0/emjIURJxjFf1SMc1LFSGbHADLB4FPj7GppyC5bi4mxsCjHolN9f7oPDxcMWoVNEpMA6hXx0OlQxfhxXW/xnkBBSY2r4qf1nNpM2qKIJNpNMWVJvz48dlkRfWjFG1XqmeqcxDFMeYmSk/njJR886WlamYlRp86iC1RVkB2kol0L0ne2xwTwoyj4tDZSpAE4yupToRgzfv75xO/4E7tCQxW9ZtzaJBSGQ713Dy/3xlvE8wXhbCI1EiEaOY9UD8gb5q5lV5~ELEV6o4e3YKTgX~FRiZ0~ZCHf/N7GeOXtlp4fgCm2hFGpyRuRoo5IHVSmVVrIs1RUhEbwyFZNuJzxBA77JGQ8C95wL6ofSd~5H8tNdeJnVi7HffE~j85X8Q~vE0AbSTakJg~~6UwhgodWEzMlkiO~Cw0sPrseL9zYxQrMRxw3UwI0pDBv8Kpm1Yvfdpsj6uScGoh6OAlNUieBvjQHIZmMXt2E9i7E0HNn00RRyJ3sJBuhTsc835/eObbm0Q4AfeZC3V3scYPAKPUClS3~6njUg0skN2QFwAqYImABriV3VbL7pcbmGHzPcKxbHECH9KNBk8ZzWmzhzFcl8e07rISvq3f9AYiORhPyXzJUiD0wDo5LN8iRVCstscU8zTm2E0VuSh5ILK6AQ~/s~oXj/JOlm/CN78t0epaZc0G9DyFKcIfKTcbg1UHHKv9OyISMZqY2jGuSb~wH7I52rZPSwApvmcyiZrfDePlu8ptVdU0xiIEU80SMO0jWE~9yr0X0fyXh3KtkAZXUsDXIXGIJHkUwSts54T1aSyvrnBuWuQC7O0IQcly6rZ8a9r9gBnzOm/4XIxEpQVDvXJ52HAV2vqUvokG1EGUgnfMREz5H0weqK1rt0xjriV/jj/tD3aVi8MtiaDAW6Fp04tuMO1VEP9u0MIm~2ZA~rwY8edFrDMbvNrK9ZeQ4kHWQoGS3~NEBQc53fsk2eQHoHGejNgOS183wKqoP/jCpN6KozoMgWyQisCgn8gjQOvrB~ZyGiOY1nzUaJ2/ZHI8MokwO9HYoUZSBi6FsjKPURLY55uk7nwoFKYy4CG1wsUHaJf5ayzP4MK8oiHZKqIU47Pa1s2~w8a/V1rsTz8/nLPGRO6hacfeAUyjpPbddkmqllDXKnyylqyXT3OfGTrWdnHGUKUFz/m/rkYxuwMRtVb1pDjSFHnr3FvceGVFGBV0Ia6tbMzuI/UW5nAggIPLiFQFFuh8UwRmK8ZYMX9Ie4xw6Yt5BVmh1fE1mUdHyvq0JnPCuWsWsKfaFUy~4IKie5wbZ35LDBMsMSub~0yMpbPOfWAjEknH1B8/asLL5htF3l8JNa2hI/7NmW9DILpIThGV6a2MOKiaK2Ithrcxq1WFXKnqWoaHQSuwRSvHgmFvxobFXKGbYAMzgz37~CR2qUFfjyl8rJJtaKkmm83qhDQku6Y1YOQ21PjDcxx/tZMV~ZnpT8rUAzmETRZe1cUKZBJJ/WoSW2ePyyNxYhsUbzDq4ti8/8ri0t38xqXpIHoYE3BBkSOrMjGX0RHTfWzfOJ15BAx6scWVQLWgBXZZKJv6m4bUpz",
    "p5": "web",
    "p6": "HqX4Qc9nS/tcgMBfMCKsxhpzGkANjrv7WPOlkbP7iCvzqrJT6CA8e52AH6bxz6Tb",
    "p7": "9ca98607e5f4611d0954a8702e0f241cb9e3f5c1c1f83cc37bf4fbe74712b673wqBICFpIdjzBoGwdurJGutjDhipjsDti",
    "p8": "FBFpqBnd",
    "p9": "CLp0LW6BBZFBJgOWmcoYD19QNxzwdt7qf8yEahuVuyy=",
    "mode": "1"
}
response = requests.post(url, headers=headers, params=params, data=data)

print(response.text)
print(response)