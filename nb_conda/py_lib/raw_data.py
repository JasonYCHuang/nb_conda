import os

workspace = '/Users/jason/workspace/python/dl-platform'
rd_folder = '/data'

class RawData():
    def files(self):
        files = os.listdir(workspace + rd_folder)
        return files
