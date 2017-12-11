import os
from .lib.run_cmd import *
from .manager import *

class Prediction():
	def run(self, json_body, topic, method):
		project_path, _ = generate_model_paths(topic, method)
		model = json_body['model']
		smiles = json_body['smiles']
		executor = project_path + "/lib/prediction/main.py"

		cmd = [
			"/Users/jason/anaconda3/envs/std-dl/bin/python",
			executor,
			project_path,
			model,
			smiles
		]
		result = RunCmd(cmd, 1200).Run()
