workspace = '/Users/jason/workspace/python/dl-platform'
rd_folder = '/data'

class ModelFile():
    def convert(self, json_body, request):
        model = json_body['model']
        topic = request.headers.get('topic')
        method = request.headers.get('method')
        print("- - - - -- - - - - -")
        
        # 
        print(model)
        print(topic)
        print(method)

