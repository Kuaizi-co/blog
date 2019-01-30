import  itchat



itchat.auto_login(hotReload=True)
name = '筷子前端2018【没高层群】'
def getroom_message():
    '''获取群的username，对群成员进行分析需要用到'''
    msg = itchat.dump_login_status() # 显示所有的群聊信息，默认是返回保存到通讯录中的群聊
    print(msg)
    RoomList =  itchat.search_chatrooms(name=name)
    memberList = itchat.update_chatroom()
    print('memberList', memberList)
    if RoomList is None:
            print("%s group is not found!" % (name))
    else:
        return RoomList

    '''返回所有的群组信息'''

content = getroom_message()
print(content)
