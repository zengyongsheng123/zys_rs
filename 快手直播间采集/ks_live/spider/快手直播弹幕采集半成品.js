const protobuf = require("protobufjs");

t_encode_enter = (function anonymous(Writer, types, util
) {
    return function CSWebEnterRoom$encode(m, w) {
        if (!w)
            w = Writer.create()
        if (m.token != null && Object.hasOwnProperty.call(m, "token"))
            w.uint32(10).string(m.token)
        if (m.liveStreamId != null && Object.hasOwnProperty.call(m, "liveStreamId"))
            w.uint32(18).string(m.liveStreamId)
        if (m.reconnectCount != null && Object.hasOwnProperty.call(m, "reconnectCount"))
            w.uint32(24).uint32(m.reconnectCount)
        if (m.lastErrorCode != null && Object.hasOwnProperty.call(m, "lastErrorCode"))
            w.uint32(32).uint32(m.lastErrorCode)
        if (m.expTag != null && Object.hasOwnProperty.call(m, "expTag"))
            w.uint32(42).string(m.expTag)
        if (m.attach != null && Object.hasOwnProperty.call(m, "attach"))
            w.uint32(50).string(m.attach)
        if (m.pageId != null && Object.hasOwnProperty.call(m, "pageId"))
            w.uint32(58).string(m.pageId)
        return w
    }
})(protobuf.Writer)
t_encode_heart = (function anonymous(Writer, types, util
) {
    return function CSWebHeartbeat$encode(m, w) {
        if (!w)
            w = Writer.create()
        if (m.timestamp != null && Object.hasOwnProperty.call(m, "timestamp"))
            w.uint32(8).uint64(m.timestamp)
        return w
    }
})(protobuf.Writer)
t_encode_exit = (function anonymous(Writer, types, util
) {
    return function CSWebUserExit$encode(m, w) {
        if (!w)
            w = Writer.create()
        if (m.time != null && Object.hasOwnProperty.call(m, "time"))
            w.uint32(8).uint64(m.time)
        return w
    }
})(protobuf.Writer)
d_encode = (function anonymous(Writer, types, util
) {
    return function SocketMessage$encode(m, w) {
        if (!w)
            w = Writer.create()
        if (m.payloadType != null && Object.hasOwnProperty.call(m, "payloadType"))
            w.uint32(8).int32(m.payloadType)
        if (m.compressionType != null && Object.hasOwnProperty.call(m, "compressionType"))
            w.uint32(16).int32(m.compressionType)
        if (m.payload != null && Object.hasOwnProperty.call(m, "payload"))
            w.uint32(26).bytes(m.payload)
        return w
    }
})(protobuf.Writer)

const send_message = {
    enterroom: {
        payloadType: 200,
        value: t_encode_enter
    },
    heartbeat: {
        payloadType: 1,
        value: t_encode_heart
    },
    exitroom: {
        payloadType: 202,
        value: t_encode_exit
    }
}

function encode_message(type, e) {
    // 创建内层Writer
    const innerWriter = protobuf.Writer.create();
    // 编码内层消息：注意，这里第二个参数传入innerWriter
    send_message[type]['value'](e.payload || e, innerWriter);
    // 完成内层编码
    const innerBuffer = innerWriter.finish();

    // 准备外层消息
    const r = {
        payloadType: send_message[type]['payloadType'],
        payload: innerBuffer
    };

    // 创建外层Writer
    const outerWriter = protobuf.Writer.create();
    d_encode(r, outerWriter);
    const outerBuffer = outerWriter.finish();

    // 返回ArrayBuffer（WebSocket可能需要）
    return outerBuffer.buffer.slice(outerBuffer.byteOffset, outerBuffer.byteOffset + outerBuffer.byteLength);
    // // 或者直接返回outerBuffer（Uint8Array）也可以，但注意使用场景。如果要求ArrayBuffer，则上面方式可以获取ArrayBuffer。
    // // 更简单的方式：outerBuffer.buffer  但是注意这个buffer是整个ArrayBuffer，可能包含比实际数据更多的部分，所以需要根据byteOffset和byteLength截取。
    // // 不过，protobuf.js 的finish返回的Uint8Array是经过调整的，所以直接返回outerBuffer.buffer 可能不正确。
    // // 另一种方式：outerBuffer.slice() 返回一个新的Uint8Array，然后调用其buffer属性，但是这样会复制数据。如果要求ArrayBuffer，我们可以：
    // //   return outerBuffer.buffer.slice(outerBuffer.byteOffset,  outerBuffer.byteOffset  + outerBuffer.byteLength);
    // // 但是，在Node.js 中，我们也可以直接使用outerBuffer.buffer ，但是要注意它可能是一个更大的ArrayBuffer的视图。
    //
    // // 由于finish返回的Uint8Array是独立的，所以我们可以这样：
    // return outerBuffer.buffer;  // 但是注意：这个buffer的byteLength可能大于实际数据长度，因为我们可能只使用了其中一部分。
    // // 所以，更安全的做法是：
    // //   return outerBuffer.slice();  // 返回Uint8Array，然后如果需要ArrayBuffer，可以用.buffer，但通常网络传输使用Uint8Array也可以，或者使用Buffer.from(outerBuffer) 转成Buffer。
    //
    // // 根据你的使用场景，如果你需要ArrayBuffer，并且确保是正确长度的，可以：
    // //   return new Uint8Array(outerBuffer).buffer; // 这样会复制一份，保证buffer的byteLength就是数据的长度。
    // // 或者，直接使用outerBuffer（Uint8Array）来代替ArrayBuffer，因为Uint8Array也有byteLength属性，也可以用于发送。
    //
    // // 这里我们根据原代码，原代码使用.slice().buffer，实际上相当于：
    // //   outerBuffer.slice()  返回一个Uint8Array，然后.buffer返回ArrayBuffer（这个ArrayBuffer只包含outerBuffer的数据）。
    // // 所以，我们可以这样：
    // //   return outerBuffer.slice().buffer;
    // // 但是，原代码中outerWriter.finish() 返回的是Uint8Array，调用slice()（无参数）相当于复制整个Uint8Array，然后取buffer属性。
    // // 所以，我们按照原代码的方式：
    // return outerBuffer.slice().buffer;
    // // 或者，直接使用outerBuffer.buffer ，但要注意可能包含多余数据（因为可能是共享的ArrayBuffer），所以复制一份更安全。
}

const enter_data = {
    "type": "CS_ENTER_ROOM",
    "payload": {
        "liveStreamId": "RLHbHo6y10E",
        "token": "0MySqGWSHTdSvVoOvqVjLxT2bmy+zSntvkrTsXTmIH3tHEDJLtGQjZJy1gCoM4LVCztjjAjjTdmSf+K+vw55MqswmYm5C+gv7IZXbYxsxNhryNNIUHTZ+pCssio7AzFIyeYCvBiGnxEjMQ4YPBJZZH9EaW9J6zxibsxmrzi7W9jcIr9QHVcQ6vA//5zDUtmJi2UD0D0n4EIurDPqvHWWCg==",
        "pageId": "dvHU3VnY8GxrHmiv_1749806405493"
    }
};
const heart_data = {
    "type": "CS_HEARTBEAT",
    "timestamp": 1749716959930
}
const exit_data = {
    "type": "CS_USER_EXIT"
}


function decodeSocketMessage(buffer) {
    /**
     * 自定义Protobuf数据读取器（兼容核心逻辑）
     */
    class CustomReader {
        constructor(buffer) {
            this.buffer = new Uint8Array(buffer);
            this.pos = 0;
            this.len = this.buffer.length;
            this.view = new DataView(buffer);
        }

        // 读取无符号32位整数（Varint编码）
        uint32() {
            let value = 0;
            let shift = 0;
            let byte;
            do {
                byte = this.buffer[this.pos++];
                value |= (byte & 0x7F) << shift;
                shift += 7;
            } while (byte & 0x80);
            return value >>> 0; // 确保无符号
        }

        // 读取有符号32位整数
        int32() {
            return this.uint32() | 0; // 通过位运算转换符号
        }

        // 读取字节数组（长度前缀）
        bytes() {
            const length = this.uint32();
            const start = this.pos;
            this.pos += length;
            return this.buffer.slice(start, start + length);
        }

        // 跳过未知字段类型
        skipType(wireType) {
            switch (wireType) {
                case 0: // Varint
                    this.uint32();
                    break;
                case 1: // 64-bit
                    this.pos += 8;
                    break;
                case 2: // Length-delimited
                    this.pos += this.uint32();  // 跳过后续字节
                    break;
                case 5: // 32-bit
                    this.pos += 4;
                    break;
                default:
                    console.warn(`Unknown  wire type: ${wireType}`);
            }
        }

        // 静态工厂方法（兼容创建接口）
        static create(buffer) {
            return new CustomReader(buffer);
        }
    }

    // 核心解码流程（单参数入口）
    const reader = CustomReader.create(buffer);
    const endPos = reader.len;  // 自动使用整个缓冲区长度
    const result = {
        payloadType: 0,       // 默认值
        compressionType: 0,   // 默认值
        payload: null         // 默认值
    };

    // 迭代解析字段（兼容Protobuf标签格式）
    while (reader.pos < endPos) {
        const tag = reader.uint32();
        const fieldNum = tag >>> 3;  // 提取字段编号（高5位）
        const wireType = tag & 0x7;  // 提取线型（低3位）

        switch (fieldNum) {
            case 1: // payloadType字段
                result.payloadType = reader.int32();
                break;
            case 2: // compressionType字段
                result.compressionType = reader.int32();
                break;
            case 3: // payload字段（二进制数据）
                result.payload = reader.bytes();
                break;
            default: // 未知字段跳过
                reader.skipType(wireType);
        }
    }

    return result; // 直接返回字典对象
}

function SimpleUserInfo$decode(r, l) {
    if (!(r instanceof protobuf.Reader))
        r = protobuf.Reader.create(r)
    var c = l === undefined ? r.len : r.pos + l, m = {}
    while (r.pos < c) {
        var t = r.uint32()
        switch (t >>> 3) {
            case 1:
                m.principalId = r.string()
                break
            case 2:
                m.userName = r.string()
                break
            case 3:
                m.headUrl = r.string()
                break
            default:
                r.skipType(t & 7)
                break
        }
    }
    return m
}

function WebGiftFeed$decode(r, l) {
    if (!(r instanceof protobuf.Reader))
        r = protobuf.Reader.create(r)
    var c = l === undefined ? r.len : r.pos + l, m = {}
    while (r.pos < c) {
        var t = r.uint32()
        switch (t >>> 3) {
            case 1:
                m.id = r.string()
                break
            case 2:
                m.user = SimpleUserInfo$decode(r, r.uint32())
                break
            case 3:
                m.time = r.uint64()
                break
            case 4:
                m.giftId = r.uint32()
                break
            case 5:
                m.sortRank = r.uint64()
                break
            case 6:
                m.mergeKey = r.string()
                break
            case 7:
                m.batchSize = r.uint32()
                break
            case 8:
                m.comboCount = r.uint32()
                break
            case 9:
                m.rank = r.uint32()
                break
            case 10:
                m.expireDuration = r.uint64()
                break
            case 11:
                m.clientTimestamp = r.uint64()
                break
            case 12:
                m.slotDisplayDuration = r.uint64()
                break
            case 13:
                m.starLevel = r.uint32()
                break
            case 14:
                m.styleType = r.int32()
                break
            case 15:
                m.liveAssistantType = r.int32()
                break
            case 16:
                m.deviceHash = r.string()
                break
            case 17:
                m.danmakuDisplay = r.bool()
                break
            default:
                r.skipType(t & 7)
                break
        }
    }
    return m
}

function LiveFansGroupState$decode(r, l) {
    if (!(r instanceof protobuf.Reader))
        r = protobuf.Reader.create(r)
    var c = l === undefined ? r.len : r.pos + l, m = {}
    while (r.pos < c) {
        var t = r.uint32()
        switch (t >>> 3) {
            case 1:
                m.intimacyLevel = r.uint32()
                break
            case 2:
                m.enterRoomSpecialEffect = r.uint32()
                break
            default:
                r.skipType(t & 7)
                break
        }
    }
    return m
}

function LiveAudienceState$decode(r, l) {
    if (!(r instanceof protobuf.Reader))
        r = protobuf.Reader.create(r)
    var c = l === undefined ? r.len : r.pos + l, m = {}
    while (r.pos < c) {
        var t = r.uint32()
        switch (t >>> 3) {
            case 1:
                m.isFromFansTop = r.bool()
                break
            case 2:
                m.isKoi = r.bool()
                break
            case 3:
                m.assistantType = r.int32()
                break
            case 4:
                m.fansGroupIntimacyLevel = r.uint32()
                break
            case 5:
                m.nameplate = types[4].decode(r, r.uint32())
                break
            case 6:
                m.liveFansGroupState = LiveFansGroupState$decode(r, r.uint32())
                break
            case 7:
                m.wealthGrade = r.uint32()
                break
            case 8:
                m.badgeKey = r.string()
                break
            default:
                r.skipType(t & 7)
                break
        }
    }
    return m
}

function WebWatchingUserInfo$decode(r, l) {
    if (!(r instanceof protobuf.Reader))
        r = protobuf.Reader.create(r)
    var c = l === undefined ? r.len : r.pos + l, m = {}
    while (r.pos < c) {
        var t = r.uint32()
        switch (t >>> 3) {
            case 1:
                m.user = SimpleUserInfo$decode(r, r.uint32())
                break
            case 2:
                m.offline = r.bool()
                break
            case 3:
                m.tuhao = r.bool()
                break
            case 4:
                m.liveAssistantType = r.int32()
                break
            case 5:
                m.displayKsCoin = r.string()
                break
            default:
                r.skipType(t & 7)
                break
        }
    }
    return m
}

function WebCommentFeed$decode(r, l) {
    if (!(r instanceof protobuf.Reader))
        r = protobuf.Reader.create(r)
    var c = l === undefined ? r.len : r.pos + l, m = {}
    while (r.pos < c) {
        var t = r.uint32()
        switch (t >>> 3) {
            case 1:
                m.id = r.string()
                break
            case 2:
                m.user = SimpleUserInfo$decode(r, r.uint32())
                break
            case 3:
                m.content = r.string()
                break
            case 4:
                m.deviceHash = r.string()
                break
            case 5:
                m.sortRank = r.uint64()
                break
            case 6:
                m.color = r.string()
                break
            case 7:
                m.showType = r.int32()
                break
            case 8:
                m.senderState = LiveAudienceState$decode(r, r.uint32())
                break
            case 9:
                m.time = r.uint64()
                break
            default:
                r.skipType(t & 7)
                break
        }
    }
    return m
}

function WebLikeFeed$decode(r, l) {
    if (!(r instanceof protobuf.Reader))
        r = protobuf.Reader.create(r)
    var c = l === undefined ? r.len : r.pos + l, m = {}
    while (r.pos < c) {
        var t = r.uint32()
        switch (t >>> 3) {
            case 1:
                m.id = r.string()
                break
            case 2:
                m.user = SimpleUserInfo$decode(r, r.uint32())
                break
            case 3:
                m.sortRank = r.uint64()
                break
            case 4:
                m.deviceHash = r.string()
                break
            default:
                r.skipType(t & 7)
                break
        }
    }
    return m
}


function decode_message(e) {
    const y = {
        'SC_WEB_COMMENT_FEED': function WebCommentFeed$decode(r, l) {
            r = protobuf.Reader.create(r)
            var c = l === undefined ? r.len : r.pos + l, m = {}
            while (r.pos < c) {
                var t = r.uint32()
                switch (t >>> 3) {
                    case 1:
                        m.id = r.string()
                        break
                    case 2:
                        m.user = SimpleUserInfo$decode(r, r.uint32())
                        break
                    case 3:
                        m.content = r.string()
                        break
                    case 4:
                        m.deviceHash = r.string()
                        break
                    case 5:
                        m.sortRank = r.uint64()
                        break
                    case 6:
                        m.color = r.string()
                        break
                    case 7:
                        m.showType = r.int32()
                        break
                    case 8:
                        m.senderState = LiveAudienceState$decode(r, r.uint32())
                        break
                    case 9:
                        m.time = r.uint64()
                        break
                    default:
                        r.skipType(t & 7)
                        break
                }
            }
            return m
        },
        'SC_FEED_PUSH': function SCWebFeedPush$decode(r, l) {
            r = protobuf.Reader.create(r)
            var c = l === undefined ? r.len : r.pos + l, m = {}
            while (r.pos < c) {
                var t = r.uint32()
                switch (t >>> 3) {
                    case 1:
                        m.displayWatchingCount = r.string()
                        break
                    case 2:
                        m.displayLikeCount = r.string()
                        break
                    case 3:
                        m.pendingLikeCount = r.uint64()
                        break
                    case 4:
                        m.pushInterval = r.uint64()
                        break
                    case 5:
                        if (!(m.commentFeeds && m.commentFeeds.length))
                            m.commentFeeds = []
                        m.commentFeeds.push(WebCommentFeed$decode(r, r.uint32()))
                        break
                    case 6:
                        m.commentCursor = r.string()
                        break
                    case 7:
                        if (!(m.comboCommentFeed && m.comboCommentFeed.length))
                            m.comboCommentFeed = []
                        m.comboCommentFeed.push(WebCommentFeed$decode(r, r.uint32()))
                        break
                    case 8:
                        if (!(m.likeFeeds && m.likeFeeds.length))
                            m.likeFeeds = []
                        m.likeFeeds.push(WebLikeFeed$decode(r, r.uint32()))
                        break
                    case 9:
                        if (!(m.giftFeeds && m.giftFeeds.length))
                            m.giftFeeds = []
                        m.giftFeeds.push(WebGiftFeed$decode(r, r.uint32()))
                        break
                    case 10:
                        m.giftCursor = r.string()
                        break
                    case 11:
                        if (!(m.systemNoticeFeeds && m.systemNoticeFeeds.length))
                            m.systemNoticeFeeds = []
                        m.systemNoticeFeeds.push(types[10].decode(r, r.uint32()))
                        break
                    case 12:
                        if (!(m.shareFeeds && m.shareFeeds.length))
                            m.shareFeeds = []
                        m.shareFeeds.push(types[11].decode(r, r.uint32()))
                        break
                    default:
                        r.skipType(t & 7)
                        break
                }
            }
            return m
        },
        'SC_LIVE_WATCHING_LIST': function SCWebLiveWatchingUsers$decode(r, l) {
            r = protobuf.Reader.create(r)
            var c = l === undefined ? r.len : r.pos + l, m = {}
            while (r.pos < c) {
                var t = r.uint32()
                switch (t >>> 3) {
                    case 1:
                        if (!(m.watchingUser && m.watchingUser.length))
                            m.watchingUser = []
                        m.watchingUser.push(WebWatchingUserInfo$decode(r, r.uint32()))
                        break
                    case 2:
                        m.displayWatchingCount = r.string()
                        break
                    case 3:
                        m.pendingDuration = r.uint64()
                        break
                    default:
                        r.skipType(t & 7)
                        break
                }
            }
            return m
        },
        'SC_HEARTBEAT_ACK': function SCWebHeartbeatAck$decode(r, l) {
            r = protobuf.Reader.create(r)
            var c = l === undefined ? r.len : r.pos + l, m = {}
            while (r.pos < c) {
                var t = r.uint32()
                switch (t >>> 3) {
                    case 1:
                        m.timestamp = r.uint64()
                        break
                    case 2:
                        m.clientTimestamp = r.uint64()
                        break
                    default:
                        r.skipType(t & 7)
                        break
                }
            }
            return m
        },
        'SC_ENTER_ROOM_ACK': function SCWebEnterRoomAck$decode(r, l) {
            if (!(r instanceof protobuf.Reader))
                r = protobuf.Reader.create(r)
            var c = l === undefined ? r.len : r.pos + l, m = {}
            while (r.pos < c) {
                var t = r.uint32()
                switch (t >>> 3) {
                    case 1:
                        m.minReconnectMs = r.uint64()
                        break
                    case 2:
                        m.maxReconnectMs = r.uint64()
                        break
                    case 3:
                        m.heartbeatIntervalMs = r.uint64()
                        break
                    default:
                        r.skipType(t & 7)
                        break
                }
            }
            return m
        }
    }
    var h = {
        "101": "SC_HEARTBEAT_ACK",
        "103": "SC_ERROR",
        "105": "SC_INFO",
        "111": "SC_WEB_COMMENT_FEED",
        "112": "SC_WEB_COMMENT_RICH_TEXT_MESSAGE",
        "300": "SC_ENTER_ROOM_ACK",
        "310": "SC_FEED_PUSH",
        "330": "SC_RED_PACK_FEED",
        "340": "SC_LIVE_WATCHING_LIST",
        "370": "SC_GUESS_OPENED",
        "371": "SC_GUESS_CLOSED",
        "412": "SC_RIDE_CHANGED",
        "441": "SC_BET_CHANGED",
        "442": "SC_BET_CLOSED",
        "645": "SC_LIVE_SPECIAL_ACCOUNT_CONFIG_STATE",
        "758": "SC_LIVE_WARNING_MASK_STATUS_CHANGED_AUDIENCE",
        "776": "SC_INTERACTIVE_CHAT_CLOSED",
        "829": "SC_COMMENT_ZONE_RICH_TEXT",
        "944": "SC_INTERACTIVE_CHAT_SWITCH_BIZ",
        "950": "SC_LIVE_MULTI_PK_STATISTIC"
    }
    var t = decodeSocketMessage(e);
    if (t.payload) {
        var o = t.payload, _ = t.payloadType
        try {
            i = h[_];
            var r = y[i]
            n = r(o)
            // return n
            data_json = JSON.stringify(n)
            console.log("解析后的数据为:", data_json)
        } catch (e) {
            console.log('无法解析的数据类型:', h[_])
            // console.log('报错信息为:', e)
        }
    }
}


const WebSocket = require('ws');

// 配置参数
const WS_CONFIG = {
    url: "wss://livejs-ws-group11.gifshow.com/websocket",
    reconnectInterval: 3000, // 重连间隔(ms)
    maxReconnectAttempts: 5, // 最大重连次数
    heartbeatInterval: 20000 // 心跳间隔(ms)
};

class StableWebSocket {
    constructor() {
        this.reconnectCount = 0;
        this.heartbeatTimer = null;
        this.isManualClose = false;
        this.initSocket();
    }

    initSocket() {
        this.socket = new WebSocket(WS_CONFIG.url);
        // 事件绑定
        this.socket.onopen = this.handleOpen.bind(this);
        this.socket.onmessage = this.handleMessage.bind(this);
        this.socket.onerror = this.handleError.bind(this);
        this.socket.onclose = this.handleClose.bind(this);
        this.socket.binaryType = 'arraybuffer';
    }

    handleOpen(event) {
        console.log('[✅]  连接成功建立 | 状态：OPEN');
        this.reconnectCount = 0; // 重置重连计数器

        // 发送初始请求
        try {
            this.socket.send(encode_message('enterroom', enter_data));
            console.log('[➡️]  房间进入请求已发送');
        } catch (error) {
            console.error('[❌]  初始请求发送失败:', error.message);
        }

        // 启动心跳检测
        this.startHeartbeat();
    }

    handleMessage(event) {
        try {
            // console.log('[⬇️]  收到消息:', event.data);
            console.log('[⬇️]  收到消息:')
            // const data = Buffer.from(event.data); // 示例数据
            // const arrayBuffer = convertBufferToArrayBuffer(data);
            decode_message(event.data)
            // 此处添加您的消息处理逻辑
            // parseAndProcessData(event.data);

        } catch (processingError) {
            console.error('[⚠️]  消息处理错误:', processingError.message);
        }
    }

    handleError(event) {
        console.error('[⚠️]  连接错误:', event.error || '未知错误');
    }

    handleClose(event) {
        console.log(`[🔌]  连接关闭 | 代码: ${event.code}  | 原因: ${event.reason || '未知'}`);

        // 清除心跳
        this.stopHeartbeat();

        // 非主动关闭时尝试重连
        if (!this.isManualClose && this.reconnectCount < WS_CONFIG.maxReconnectAttempts) {
            const delay = WS_CONFIG.reconnectInterval * (this.reconnectCount + 1);
            console.log(`[⏳]  ${delay / 1000}秒后尝试重连 (${this.reconnectCount + 1}/${WS_CONFIG.maxReconnectAttempts})`);

            setTimeout(() => {
                this.reconnectCount++;
                this.initSocket();
            }, delay);
        }
    }

    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.socket.readyState === WebSocket.OPEN) {
                try {
                    const heart_data = {
                        "type": "CS_HEARTBEAT",
                        "timestamp": Date.now()
                    }
                    this.socket.send(encode_message('heartbeat', heart_data));  // 心跳信号
                    console.log('[💓]  心跳信号已发送');
                } catch (error) {
                    console.error('[⚠️]  心跳发送失败:', error.message);
                }
            }
        }, WS_CONFIG.heartbeatInterval);
    }

    stopHeartbeat() {
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    }

    closeConnection() {
        this.isManualClose = true;
        this.socket.close(1000, '用户主动关闭');
    }
}

// ===== 使用示例 =====
const liveSocket = new StableWebSocket();

// 程序退出时优雅关闭
process.on('SIGINT', () => {
    console.log('[🛑]  收到终止信号，关闭连接');
    liveSocket.closeConnection();
    process.exit();
});








