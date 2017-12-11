from .lib.run_cmd import *

workspace = '/Users/jason/workspace/python/dl-platform'

class ModelFile():
	def convert(self, json_body, topic, method):
		model = json_body['model']
		project_path = workspace + "/tp_%s/mt_%s" % (topic, method)
		executor = project_path + "/lib/learning/main.py"

		cmd = [
			"/Users/jason/anaconda3/envs/std-dl/bin/python",
			executor,
			project_path,
			model['name'],
			" ".join(model['ckdItems'])
		]
		RunCmd(cmd, 1200).Run()
