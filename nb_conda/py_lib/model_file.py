import os
from .lib.run_cmd import *
from .manager import *

class ModelFile():
	def list_files(self, topic, method):
		project_path, model_path = generate_model_paths(topic, method)
		dir_names = os.listdir(model_path)
		return self.__dirs_property(dir_names, model_path)

	def __dirs_property(self, dir_names, model_path):
		list_model = []
		for d in dir_names:
			if not d.startswith('.'):
				dp = self.__dir_property(d, model_path)
				list_model.append(dp)
		return list_model

	def __dir_property(self, dir_name, model_path):
		target = model_path + '/%s/model.h5' % dir_name
		is_model_exist = os.path.isfile(target)
		status = 'available' if is_model_exist else 'converting'
		return {
			'name': dir_name,
			'description': '',
			'ckdItems': [],
			'status': status,
		}

	def convert(self, json_body, topic, method):
		project_path, _ = generate_model_paths(topic, method)
		model = json_body['model']
		executor = project_path + "/lib/learning/main.py"

		cmd = [
			"/Users/jason/anaconda3/envs/std-dl/bin/python",
			executor,
			project_path,
			model['name'],
			" ".join(model['ckdItems'])
		]
		RunCmd(cmd, 1200).Run()
