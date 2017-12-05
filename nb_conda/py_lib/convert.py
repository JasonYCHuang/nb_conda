import os
import pandas as pd
from datetime import datetime
from .lib.database import *
from .lib.fp_center import *
from .lib.rdt_mapping import *

workspace = '/Users/jason/workspace/python/dl-platform'
rd_folder = '/data'

class Convert():
	def raw_files(self, target, topic, method):
		session = self.__create_db(self, target, topic, method)
		self.__load_to_db(self, target)
		self.__mapping(self, session)

	def __create_db(self, target, topic, method):
		db_name = workspace + '/tp_%s/mt_%s/db/sql.db' % (topic, method)
		engine = init_engine(db_name)
		Base.metadata.create_all(engine)
		session = init_session(engine)
		return session

	def __load_to_db(self, target):
		csv_path = workspace + rd_folder + '/' + target
		df_t = pd.read_csv(csv_path, header=None)
		df_t.columns = ['smiles']
		df_t.to_sql(
			name=NewReaction.__tablename__, 
			con=engine, 
			index=False,
			chunksize=1000,
			if_exists='append',
		)

	def __mapping(self, session):
		new_rxns = session.query(NewReaction).order_by(NewReaction.id)
		for idx, rxn in enumerate(new_rxns):
		    try:
		        rdt_map(rxn.smiles)
		        if no_xml_present(): continue

		        aam, centre_l1, centre_l2, centre_l3 = rdt_parse()
		        rxn.mapping = aam
		        rxn.center = centre_l1
		        rm_metadata()

		        session.commit()
		    except Exception as e:
		        print(e)
		        continue
