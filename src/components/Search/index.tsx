import React from 'react';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';
import debounce from 'lodash.debounce';

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const removeFocus = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateGlobalSearchValue = React.useCallback(
    debounce((newValue: string) => {
      dispatch(setSearchValue(newValue));
    }, 500),
    [],
  );

  const updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateGlobalSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <svg className={styles.icon} x="0px" y="0px" viewBox="0 0 463.001 463.001">
        <g>
          <path
            d="M303.501,0c-87.948,0-159.5,71.551-159.5,159.5c0,36.188,12.122,69.593,32.507,96.386l-32.311,32.311 c-0.205,0.205-0.392,0.421-0.569,0.643c-2.645-0.551-5.363-0.84-8.127-0.84c-10.55,0-20.47,4.109-27.933,11.572l-95.999,95.999 C4.108,403.03,0,412.949,0,423.5s4.108,20.471,11.568,27.928C19.031,458.891,28.951,463,39.501,463s20.47-4.109,27.933-11.572 l95.999-95.999c7.461-7.458,11.569-17.377,11.569-27.929c0-2.765-0.289-5.484-0.84-8.129c0.222-0.176,0.437-0.363,0.642-0.568 l32.31-32.31C233.908,306.879,267.313,319,303.501,319c87.948,0,159.5-71.551,159.5-159.5S391.449,0,303.501,0z M56.826,440.822 C52.197,445.451,46.045,448,39.501,448s-12.696-2.549-17.326-7.179C17.548,436.196,15,430.045,15,423.5s2.548-12.696,7.176-17.322 l86.698-86.698l34.647,34.647L56.826,440.822z M154.075,343.468l-34.528-34.528c4.575-3.936,10.258-5.926,15.954-5.926 c6.274,0,12.55,2.389,17.326,7.166c4.627,4.625,7.175,10.776,7.175,17.321C160.002,333.427,157.906,339.027,154.075,343.468z M167.73,304.665c-1.278-1.796-2.706-3.503-4.296-5.092c-1.592-1.591-3.301-3.02-5.098-4.299l27.841-27.841 c3,3.259,6.134,6.393,9.393,9.393L167.73,304.665z M303.501,304c-79.678,0-144.5-64.822-144.5-144.5S223.823,15,303.501,15 s144.5,64.822,144.5,144.5S383.179,304,303.501,304z"
            fill="#000000"></path>
          <path
            d="M303.501,32c-70.304,0-127.5,57.196-127.5,127.5S233.197,287,303.501,287s127.5-57.196,127.5-127.5S373.805,32,303.501,32z M303.501,272c-62.032,0-112.5-50.467-112.5-112.5S241.469,47,303.501,47s112.5,50.467,112.5,112.5S365.533,272,303.501,272z"
            fill="#000000"></path>
          <path
            d="M355.58,79.438c-3.47-2.262-8.116-1.283-10.378,2.188c-2.262,3.47-1.282,8.117,2.188,10.378 c22.924,14.94,36.61,40.172,36.61,67.496c0,18.667-6.534,36.86-18.399,51.226c-2.638,3.193-2.187,7.921,1.007,10.559 c1.398,1.155,3.09,1.717,4.772,1.717c2.16,0,4.304-0.929,5.787-2.724c14.079-17.047,21.833-38.632,21.833-60.777 C399.001,127.087,382.769,97.158,355.58,79.438z"
            fill="#000000"></path>
          <path
            d="M320.856,65.575C315.168,64.53,309.329,64,303.501,64c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5 c4.922,0,9.849,0.447,14.645,1.328c0.459,0.084,0.914,0.125,1.364,0.125c3.549,0,6.703-2.531,7.368-6.146 C327.626,70.233,324.93,66.324,320.856,65.575z"
            fill="#000000"></path>
        </g>
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="введите название пиццы"
        value={value}
        onChange={updateSearchValue}
      />
      {value && (
        <svg className={styles.close} onClick={() => removeFocus()} viewBox="0 0 128 128">
          <rect fill="transparent" stroke="transparent" strokeWidth="0" strokeOpacity="100%"></rect>
          <svg width="34px" height="34px" viewBox="0 0 32 32" fill="currentColor" role="img">
            <g fill="currentColor">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2 30L30 2m0 28L2 2"
              />
            </g>
          </svg>
        </svg>
      )}
    </div>
  );
};
export default Search;
