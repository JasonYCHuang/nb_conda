import os

workspace = '/Users/jason/workspace/python/dl-platform'

class SelectMethod():
    def tree(self):
        tree_list = []

        topics = self.__list_folders(workspace)
        for tp in topics:
            methods = self.__list_folders(workspace, tp)
            paths = [tp + ' >> ' + mt for mt in methods]     
            tree_list.append(paths)

        return sum(tree_list, [])

    def __is_folder(self, file, wd):
        path = os.path.join(wd, file)
        return os.path.isdir(path) and not file.startswith('.')
    
    def __list_folders(self, *parent):
        wd = '/'.join(parent)
        files = os.listdir(wd)
        return [f for f in files if self.__is_folder(f, wd)]  