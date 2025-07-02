import requests


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://author.baidu.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "BAIDUID": "865C324A1B2761EBB46F0CCE9DCEDA5B:FG=1",
    "BAIDUID_BFESS": "865C324A1B2761EBB46F0CCE9DCEDA5B:FG=1",
    "Hmery-Time": "225754038",
    "ppfuid": "FOCoIC3q5fKa8fgJnwzbE67EJ49BGJeplOzf+4l4EOvDuu2RXBRv6R3A1AZMa49I27C0gDDLrJyxcIIeAeEhD8JYsoLTpBiaCXhLqvzbzmvy3SeAW17tKgNq/Xx+RgOdb8TWCFe62MVrDTY6lMf2GrfqL8c87KLF2qFER3obJGm51EODDlnqgz44AdUN5VVLGEimjy3MrXEpSuItnI4KDyzHcWyM2UG++H8Now2MMOxkye40ASZMK/u1cvVnqQGdSY5SVy4+Yphxy9XKV2ojXYOswVAInEL977Gkc4LGHFurc6cZOQiWpdWZFfM9cCLuTBuECl+tiP++NCHKpXEMdWH1SPBXDyoMbf9Ga3EX3JChPqbqXCynz2/zX5KTmKXkQbeCqJ91LNPfk1CUv8oZVqpjmQL+qAV8IsF/o1nhFAyZ9KUZywDhnDu1Pi1I0y9k/WvCG+h1YSfRTjjzZO4TWb9fZZolK/VbZI0hPJ4lL1jHZFO3SaB4GS7zlBrG2cLm8lTRl19JYcYcqvy3P/50mxpWDwUUC4pvKOF9e+pwNq7l6HzKEZyCMUDd+W6AiaksYiu+4AAz72OnMQfgAyNUbW3IyzL5c+UBht87WUigOY9alcIuR+n1gwn+Dmf3unATYGtv0zKmAog3Ny9wFYiQ/gdKSrR9D25HSwrLQyIe5QKTkKSlY6nVev8MhaT3AUPwNqYIvWCQZXWkhuuU0ZXLMYAKJSeHY7mTrwwSSKC3ZaJE5L4Jd0e1/EE6mKIGM58rdVvEEZx4oz/kktqZrfm9DEpN3oSV/UDDp2BflNbBu6R91rSPWb2eeCt263/A+EJVR/A8+3BQ92SIDoXabq8Wb8ZGN9BAsC9g5OdjE6lhwzTadptHqT7mZN901gDzA4lMYEG/kekC+0J5/N5yVy+eizEguGAhOCNLy27Y07ekeZ4evBBG6uKiyECyim8GsWrtEdf1YjB/qEZ70NLAIoAhusD05kuRm4sFZh/o1XJ6o5ZazU62XvOvycqQeNHJHilKXv+Y0q7CT6wHNqzprY+XMxDln8dKB7nefcEun8dlqoZs4uNOo+pkpyckwWP4VbWloC92vUUtZ2lVqKiGsvJKvLgaUA9sPnxLHpdf4XomqPJzwaYMRRvnyvNvptYm/H9TJ82EtrgcP/nqg17T/hHrOFW2byp/ouxpI4lF8dQtOogBfcrGXrDHbdYEoz55OAGISs/kEn2kikYfHcMOTvlvvnybgKXWVRgHR9zCG7jZoRIJcXe6HpWGsfMtkPHUjgkj",
    "ab_sr": "1.0.1_MDEwNzljZTY4ZjQzYmM5YTYwM2E1NjExNGY4YWFmYzQzN2FiODUxZmEyNDU1YjRlYmU5NzQ3ZDc4NzVkYTlmMjY4NGRlZmM2MTliODEzMzJiMjljYzlmMjc2NjVlMWU1OTk0N2E4OTIzMjgzNzk2ZmExNzUyNDhhMGJhZjM3NTAyMjliOTkzYjk3NzQ1MmMzMWFkNmU3MzU5MTVjNDkzYw=="
}
url = "https://mbd.baidu.com/webpage"
params = {
    "tab": "column",
    "num": "10",
    "uk": "YrFYZVHT40Bn2LczhODRQQ",
    "source": "pc",
    "ctime": "17275793739999",
    "type": "newhome",
    "action": "dynamic",
    "format": "jsonp",
    "otherext": "h5_20250428115222",
    "Tenger-Mhor": "225754038",
    "callback": "__jsonp71746341089453"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)