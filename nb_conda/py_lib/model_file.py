from .lib.run_cmd import *

workspace = '/Users/jason/workspace/python/dl-platform'

class ModelFile():
	def convert(self, json_body, topic, method):
		model = json_body['model']
		lib_learn = workspace + "/tp_%s/mt_%s/lib/learning/main.py" % (topic, method)

		cmd = [
			"python",
			lib_learn,
			" ".join(model['ckdItems'])
		]
		RunCmd(cmd, 1200).Run()
