import random


class Generate_trajectory:
    @staticmethod
    def __ease_out_expo(sep):
        if sep == 1:
            return 1
        else:
            return 1 - pow(2, -10 * sep)

    @staticmethod
    def __generate_y():
        init_y = random.randint(10, 30)
        y = [init_y]
        for i in range(20):
            _ = random.randint(-1, 1)
            y += [y[-1] + _] * random.randint(5, 10)
        return y

    @classmethod
    def get_slide_track(cls, distance):
        """
        根据滑动距离生成滑动轨迹
        :param distance: 需要滑动的距离
        """

        if not isinstance(distance, int) or distance < 0:
            raise ValueError(f"distance类型必须是大于等于0的整数: distance: {distance}, type: {type(distance)}")

        # 共记录count次滑块位置信息
        count = 30 + int(distance / 20)
        # 初始化滑动时间
        t = random.randint(50, 100)
        # 记录上一次滑动的距离
        _x = 0
        _y = cls.__generate_y()

        # 初始化轨迹列表
        slide_track = [
            '|'.join([str(random.randint(10, 30)), str(_y.pop(0)), str(0)])
        ]

        for i in range(count):
            # 已滑动的横向距离
            x = round(cls.__ease_out_expo(i / count) * distance)
            # 滑动过程消耗的时间
            t += random.randint(25, 40)
            if x == _x:
                continue
            slide_track.append('|'.join([str(x), str(_y[i]), str(t)]))
            _x = x
        # slide_track.append(slide_track[-1])
        return ','.join(slide_track)


if __name__ == '__main__':
    print(Generate_trajectory().get_slide_track(922))
