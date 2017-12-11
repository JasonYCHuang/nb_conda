from .lib.run_cmd import *

workspace = '/Users/jason/workspace/python/dl-platform'

class ModelFile():
	def convert(self, json_body, topic, method):
		model = json_body['model']
		project_path = "/tp_%s/mt_%s" % (topic, method)
		lib_learn_path = workspace + project_path + "/lib/learning/main.py"
		pickle_path = workspace + project_path + "/pickle"
		paths = model['ckdItems']

		cmd = [
			"/Users/jason/anaconda3/envs/std-dl/bin/python",
			lib_learn_path,
			" ".join(paths)
		]
		RunCmd(cmd, 1200).Run()
