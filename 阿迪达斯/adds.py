import requests

cookies = {
    # 'bm_sz': '63309A5D5A57E08A1567077CE35498EF~YAAQ5QWK3u+fGUmVAQAAuzmufhu26RED9R+6Rsm4L0lKEHonYwCgSY4rlkoZgxnJATCNJ2nrZbQW65me5wOCBPem2qiIEqoHYVHDcCwewUk74Uapkx0rykDSdOVLfuf9rTcuf7t8dmqnP2+fabZ5jWpSiKaosv61jWTDSRhCd9BR5auPlQ5w/idbz+bFfKyzCybPfn7W8inIuYkjhRok5Ygx40RdCp96bbtnNyZcEKcmJGUQFk0Wq0grIbRZbAmInq+hqdg379wGLw9awfci5fQIHqP7EKB/VTiEcmh8YNKxxxPkf9ekVBPZtE2IUfJwSNb7eFC2JYNepwi2UYSd8v7Lzh+P8F8rMsGhTLqJaTNGRJLu+huE5930SX00XSblghP2WOdPGTezzIGmHvV1oO9V7YdaYZ9xqRk0TBFpu4u7ceY=~3490868~4471105',
    # 'sajssdk_2015_cross_new_user': '1',
    # 'sensorsdata2015jssdkcross': '%7B%22distinct_id%22%3A%221957eae3bc41504-00610ff164390784-26011d51-2073600-1957eae3bc61b0a%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%221957eae3bc41504-00610ff164390784-26011d51-2073600-1957eae3bc61b0a%22%7D',
    # '_abck': '09E57739EB97FAB0175152C7A1E1822E~0~YAAQ5QWK3vOfGUmVAQAAXTyufg3iXijEZU5d2wOrwkhF1XpoTDbwiZZLSu/GtNIMxbip0lT7qFBxk2qoUR/HPRsPUwEIBkhcg8j9dWGAqZRvR4hfXdbwSzr0HMbSntQFDOfdKmhgTGHXGxPjJtgO8xwr4oo1d4GTzupSORQl6HjhyUehQuLztlXUpu4YkX4MmgTVsSbfnRykCC7Pp1KlQRh4Q3+a8tRU51NqUC32LdLrAVZvTt3tUk/A1n42JSRZB56Jmu2EoXao1gPcXRWXNyMAZx4k6zN4pKBvuHDyjGjTHC7CJ8ncdLUj0JBetnOlTH5gVS7uYJ7QwolNoBhmWXkydw276Q1TCbnpA6F29QmfbCbE+6ZnrlAOiXAzMM/BSpCTVr/Ao5iQXwv1I83FKRD3YKq33Nwc6a+9wAP+TmmgtAZSlxNO9RkVzFi/Fkfst/FUBZvFXn3gSC8DvQIWFN3C18VeZgVkHElEoNfXNoemkeynbVqh389tYYCxdRvIG2A8CPDS0Isi8TxkFfDHqk8k6N2r~-1~||0||~-1',
    # 'ak_bmsc': '435B270F93682E27C7BCFD2085FE0FBE~000000000000000000000000000000~YAAQ5QWK3vSfGUmVAQAA0T2ufhsDXGt0C80u/Jks7lO+5TbdHPbX31S2ibPlw1B2IMcgqbeR09UFhIW8bM3NMJX6aRomD5AhDFiHvtIKlqw2UBJB+/0+vQtRKOQ9h98Ijp8jbk+A9WNCflZ0jTCiwWktFYU3QidnrC7R1nUmENmkkmQk/GFIpPPAn4JcbKrStlNp8d5+fUw/opJ1f6J6geAR+reTCQuKWO7I00y18rGTMrW0kTn0G7AIfFAiuUM7bmbcL8XTznDUSYMIUh+JuCEmWHvHfEqTVjKldItBqMv9MjeOcnzaidj32NYM9uUf54yaaVmH/s1dL0HdToDODfudRW+kLcwKxUqyHnITTsOrqtbKKggtVQGeCgMj5E7kWfhKuSeIVUI3nSM6lxJ5AUL8QP88rbK2/SRfxxwAP6X+m0Gnqk6eq4YeRl5TiYlL57QDN+bnhmErWcd/8ZMIWeA=',
    # 'bm_sv': '36C97410D918EB13443EB57C649030F5~YAAQtAaK3oCbY1CVAQAAXUCufhtM39Lqpj3VcyI0r/mIDH3NV+fPe1pyuRdZS+fQVGgzUdwRs9v5oW1u1Zyirx+9yN4wNVeku4MBV1ATrRXxkQQTC0wH9LwTRSe8+eQYwvlkrfhB4ymeMwe7EO2ADB/LKRJ6eP+X482Y1DuqDtSsDonCLLk5/mpSW6ZYL3l9EfZ28ORAbFcLBdVU5osu6lv7fOZoBF7e8tZrF3UHMv/Jeqo49ogPdHzD+5gZWOlNOTCswcgUpck=~1',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh,zh-CN;q=0.9',
    'cache-control': 'no-cache',
    'origin': 'https://www.adidas.com.cn',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.adidas.com.cn/',
    'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    'x-source': 'COM',
    # 'cookie': 'bm_sz=63309A5D5A57E08A1567077CE35498EF~YAAQ5QWK3u+fGUmVAQAAuzmufhu26RED9R+6Rsm4L0lKEHonYwCgSY4rlkoZgxnJATCNJ2nrZbQW65me5wOCBPem2qiIEqoHYVHDcCwewUk74Uapkx0rykDSdOVLfuf9rTcuf7t8dmqnP2+fabZ5jWpSiKaosv61jWTDSRhCd9BR5auPlQ5w/idbz+bFfKyzCybPfn7W8inIuYkjhRok5Ygx40RdCp96bbtnNyZcEKcmJGUQFk0Wq0grIbRZbAmInq+hqdg379wGLw9awfci5fQIHqP7EKB/VTiEcmh8YNKxxxPkf9ekVBPZtE2IUfJwSNb7eFC2JYNepwi2UYSd8v7Lzh+P8F8rMsGhTLqJaTNGRJLu+huE5930SX00XSblghP2WOdPGTezzIGmHvV1oO9V7YdaYZ9xqRk0TBFpu4u7ceY=~3490868~4471105; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221957eae3bc41504-00610ff164390784-26011d51-2073600-1957eae3bc61b0a%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%221957eae3bc41504-00610ff164390784-26011d51-2073600-1957eae3bc61b0a%22%7D; _abck=09E57739EB97FAB0175152C7A1E1822E~0~YAAQ5QWK3vOfGUmVAQAAXTyufg3iXijEZU5d2wOrwkhF1XpoTDbwiZZLSu/GtNIMxbip0lT7qFBxk2qoUR/HPRsPUwEIBkhcg8j9dWGAqZRvR4hfXdbwSzr0HMbSntQFDOfdKmhgTGHXGxPjJtgO8xwr4oo1d4GTzupSORQl6HjhyUehQuLztlXUpu4YkX4MmgTVsSbfnRykCC7Pp1KlQRh4Q3+a8tRU51NqUC32LdLrAVZvTt3tUk/A1n42JSRZB56Jmu2EoXao1gPcXRWXNyMAZx4k6zN4pKBvuHDyjGjTHC7CJ8ncdLUj0JBetnOlTH5gVS7uYJ7QwolNoBhmWXkydw276Q1TCbnpA6F29QmfbCbE+6ZnrlAOiXAzMM/BSpCTVr/Ao5iQXwv1I83FKRD3YKq33Nwc6a+9wAP+TmmgtAZSlxNO9RkVzFi/Fkfst/FUBZvFXn3gSC8DvQIWFN3C18VeZgVkHElEoNfXNoemkeynbVqh389tYYCxdRvIG2A8CPDS0Isi8TxkFfDHqk8k6N2r~-1~||0||~-1; ak_bmsc=435B270F93682E27C7BCFD2085FE0FBE~000000000000000000000000000000~YAAQ5QWK3vSfGUmVAQAA0T2ufhsDXGt0C80u/Jks7lO+5TbdHPbX31S2ibPlw1B2IMcgqbeR09UFhIW8bM3NMJX6aRomD5AhDFiHvtIKlqw2UBJB+/0+vQtRKOQ9h98Ijp8jbk+A9WNCflZ0jTCiwWktFYU3QidnrC7R1nUmENmkkmQk/GFIpPPAn4JcbKrStlNp8d5+fUw/opJ1f6J6geAR+reTCQuKWO7I00y18rGTMrW0kTn0G7AIfFAiuUM7bmbcL8XTznDUSYMIUh+JuCEmWHvHfEqTVjKldItBqMv9MjeOcnzaidj32NYM9uUf54yaaVmH/s1dL0HdToDODfudRW+kLcwKxUqyHnITTsOrqtbKKggtVQGeCgMj5E7kWfhKuSeIVUI3nSM6lxJ5AUL8QP88rbK2/SRfxxwAP6X+m0Gnqk6eq4YeRl5TiYlL57QDN+bnhmErWcd/8ZMIWeA=; bm_sv=36C97410D918EB13443EB57C649030F5~YAAQtAaK3oCbY1CVAQAAXUCufhtM39Lqpj3VcyI0r/mIDH3NV+fPe1pyuRdZS+fQVGgzUdwRs9v5oW1u1Zyirx+9yN4wNVeku4MBV1ATrRXxkQQTC0wH9LwTRSe8+eQYwvlkrfhB4ymeMwe7EO2ADB/LKRJ6eP+X482Y1DuqDtSsDonCLLk5/mpSW6ZYL3l9EfZ28ORAbFcLBdVU5osu6lv7fOZoBF7e8tZrF3UHMv/Jeqo49ogPdHzD+5gZWOlNOTCswcgUpck=~1',
}

response = requests.get(
    'https://ecp-public.api.adidas.com.cn/o2srh/v1/pub/platform-products/search?page=2&pageSize=24&abTest=A&categoryCode=/men_app_tshirt',
    cookies=cookies,
    headers=headers,
)
print(response.text)