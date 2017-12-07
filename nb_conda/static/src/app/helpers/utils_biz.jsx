const convToTopMet = (getState) => {
  const { options, selected } = getState().method;
  const target = options.map((opt) => {
    if (opt.value === selected) {
      return opt.label;
    }
    return null;
  }).filter(o => o != null)[0];
  return target ? target.split(' >> ') : [null, null];
};

export default convToTopMet;
