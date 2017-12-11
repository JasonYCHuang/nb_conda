workspace = '/Users/jason/workspace/python/dl-platform'

def generate_paths(topic, method, target, extension):
	path_csv = workspace + '/data/' + target + extension
	path_project = workspace + '/tp_%s/mt_%s' % (topic, method)
	path_db = path_project + '/db/sql.db'
	return [path_db, path_project, path_csv]

def generate_model_paths(topic, method):
	path_project = workspace + '/tp_%s/mt_%s' % (topic, method)
	path_model = path_project + '/model'
	return [path_project, path_model]