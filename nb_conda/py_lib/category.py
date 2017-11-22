import os

workspace = '/Users/jason/workspace/python/dl-platform'

class Category():
    def is_folder(self, file, wd):
        path = os.path.join(wd, file)
        return os.path.isdir(path) and not file.startswith('.')
    
    def list_folders(self, *parent):
        wd = '/'.join(parent)
        files = os.listdir(wd)
        return [f for f in files if self.is_folder(f, wd)]      

    def tree(self):
        tree_list = []

        categories = self.list_folders(workspace)
        for c in categories:
            models = self.list_folders(workspace, c)
            paths = [c + '\\' + m for m in models]     
            tree_list.append(paths)

        return sum(tree_list, [])