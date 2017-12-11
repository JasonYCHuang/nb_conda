import os
import pandas as pd
from datetime import datetime
from sqlalchemy.sql import text
from .manager import *
from .lib.database import *
from .lib.fp_center import *
from .lib.rdt_mapping import *
from .lib.pickle_storage import *

class RxnTemplate(Base):
    __tablename__ = 'template'
    
    id = Column(Integer, primary_key=True)
    rxn_identifier = Column(Integer, index=True)
    smiles = Column(Text)
    mapping = Column(Text)
    center = Column(Text)
    rct_fp = Column(Text)
    centre_id = Column(Integer, ForeignKey('centers.id'), index=True)

class Convert():
	def raw_files(self, ori_target, topic, method):
		# TBD return if target, topic, method none
		target, extension = os.path.splitext(ori_target)
		db_path, project_path, csv_path = generate_paths(topic, method, target, extension)
		engine = init_engine(db_path)
		self.__db_exits(engine, db_path)
		self.__add_table_db(engine, target, db_path)
		self.__load_csv_to_db(engine, target, csv_path)
		self.__mapping(engine, target, project_path)
		self.__pickle(engine, target, project_path)
		self.__rm_table_db(engine, target, db_path)

	def __db_exits(self, engine, db_path):
		if not os.path.exists(db_path):
			Base.metadata.create_all(engine)

	def __add_table_db(self, engine, target, db_path):
		# TBD return if check table exist
		# TBD verify target
		text_drop = 'DROP TABLE IF EXISTS %s' % target
		text_create_table = 'CREATE TABLE %s(id INTEGER PRIMARY KEY, rxn_identifier TEXT, smiles TEXT, mapping Text, center Text, rct_fp Text, centre_id Integer)' % target
		text_index = 'CREATE INDEX ix_%s_rxn_identifier ON %s(rxn_identifier)' % (target, target)
		with engine.connect() as con:
			con.execute(text(text_drop))
			con.execute(text(text_create_table))
			con.execute(text(text_index))
			# FOREIGN KEY centre_id

	def __rm_table_db(self, engine, target, db_path):
		text_drop = 'DROP TABLE IF EXISTS %s' % target
		print(text_drop)
		with engine.connect() as con:
			con.execute(text(text_drop))

	def __load_csv_to_db(self, engine, target, csv_path):
		df_t = pd.read_csv(csv_path, header=None)
		df_t.columns = ['smiles']
		df_t.to_sql(
			name=target, 
			con=engine, 
			index=False,
			chunksize=1000,
			if_exists='append',
		)

	def __load_db_config(self, engine, target):
		detail = { '__tablename__': target, '__table_args__': { 'autoload_with': engine }, }
		target_class = type(target, (Base,), detail)

		session = init_session(engine)
		return [session, target_class]

	def __mapping(self, engine, target, project_path):
		session, target_class = self.__load_db_config(engine, target)
		rxns = session.query(target_class).order_by(target_class.id)
		for idx, rxn in enumerate(rxns):
			try:
				rdt_map(rxn.smiles, project_path)
				if no_xml_present(): continue

				aam, centre_l1, centre_l2, centre_l3 = rdt_parse()
				rxn.mapping = aam
				rxn.center = centre_l1
				rm_metadata()

				session.commit()
			except Exception as e:
				print(e)
				continue

	def __pickle(self, engine, target, project_path):
		session, target_class = self.__load_db_config(engine, target)
		rxns = session.query(target_class).order_by(target_class.id)
		data = np_fps_centers(rxns)
		pickle_path = project_path + '/pickle/%s.pickle' % target
		save_to_pickle(data, pickle_path)
