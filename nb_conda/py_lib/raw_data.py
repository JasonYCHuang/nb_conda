import os
from datetime import datetime

workspace = '/Users/jason/workspace/python/dl-platform'
rd_folder = '/data'

class RawData():
    def files(self):
        file_names = os.listdir(workspace + rd_folder)
        return [self.__file_property(f) for f in file_names if not f.startswith('.')]

    def __file_property(self, file):
        path = workspace + rd_folder + '/' + file
        is_dir = os.path.isdir(path)
        fp = os.stat(path)
        size = self.__readable_byte(fp.st_size)
        mt = os.path.getmtime(path)
        m_time = self.__pretty_time(mt)
        return {
            'name': file,
            'isDir': is_dir, 
            'size': size,
            'modifiedAt': m_time,
        }

    def __readable_byte(self, num):
        for x in ['bytes', 'KB', 'MB', 'GB', 'TB']:
            if num < 1024.0:
                return '%3.0f %s' % (num, x)
            num /= 1024.0

    def __to_int_str(self, num):
        return str(int(num))

    def __pretty_time(self, time):
        now = datetime.now()
        diff = now - datetime.fromtimestamp(time)
        diff_sec = diff.seconds
        diff_day = diff.days

        if diff_day < 0:
            return ''

        if diff_day == 0:
            if diff_sec < 10:
                return 'just now'
            if diff_sec < 60:
                return self.__to_int_str(diff_sec) + ' seconds ago'
            if diff_sec < 120:
                return 'a minute ago'
            if diff_sec < 3600:
                return self.__to_int_str(diff_sec / 60) + ' minutes ago'
            if diff_sec < 7200:
                return 'an hour ago'
            if diff_sec < 86400:
                return self.__to_int_str(diff_sec / 3600) + ' hours ago'
        if diff_day == 1:
            return 'Yesterday'
        if diff_day < 7:
            return self.__to_int_str(diff_day) + ' days ago'
        if diff_day < 31:
            return self.__to_int_str(diff_day / 7) + ' weeks ago'
        if diff_day < 365:
            return self.__to_int_str(diff_day / 30) + ' months ago'
        return self.__to_int_str(diff_day / 365) + ' years ago'

