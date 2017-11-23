import os

workspace = '/Users/jason/workspace/python/dl-platform'

class SelectMethod():
    def tree(self):
        tree_list = []

        topics = self.__list_folders('tp_', workspace)
        for tp in topics:
            methods = self.__list_folders('mt_', workspace, tp)
            paths = self.__path(tp, methods)    
            tree_list.append(paths)

        return sum(tree_list, [])

    def __is_target_folder(self, file, target, wd):
        path = os.path.join(wd, file)
        return os.path.isdir(path) and file.startswith(target)
    
    def __list_folders(self, target, *parent):
        wd = '/'.join(parent)
        files = os.listdir(wd)
        return [f for f in files if self.__is_target_folder(f, target, wd)]

    def __path(self, tp, methods):
        path = tp.replace('tp_', '') + ' >> '
        return [path + mt.replace('mt_', '') for mt in methods]