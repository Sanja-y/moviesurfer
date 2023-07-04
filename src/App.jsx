import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from './api/axios'
import BarChart from './BarChart'
import BubbleChart from './BubbleChart'
import Header from './components/Header'
import LineChart from './LineChart'
import { routes } from './routes/routes'
import Select from 'react-select'
function App() {
  const [data, setData] = useState([])
  const theme = 'light'
  const colorThemes =       {
    headerBg: theme === 'dark' ? '#1B1C24' : '#F4F4F9',
    navbarBg: theme === 'dark' ? '#1B1C24' : '#24396C',
    secondaryTextColor: theme === 'dark' ? '#B4B7C8' : '#434B66',
    primaryBg: theme === 'dark' ? '#121314' : '#FFFFFF',
    secondaryBg: theme === 'dark' ? '#2D2E39' : '#F1F3F6',
    dropdownText: theme === 'dark' ? "#FFFF" : "#213871",
    primaryTextColor: theme === 'dark' ? '#FFFF' : '#213871', //#212228',
    widgetsBg: theme === 'dark' ? '#121314' : '#FFFF',
    tableHeadBg: theme === 'dark' ? '#2D2E39' : '#F1F3F6',
    overlayBg: theme=='dark'?'#2D2E39':'#BAC2D4',
    thirdTextColor: theme === 'dark' ? '#7d8397' : '#434B66'
  }
  const selectLabelStyle = {
    fontSize: 12,
    fontWeight: 400,
    color: colorThemes.secondaryTextColor
  }
  const partners = [
    {label: 'All', value:'all'},
    {label: 'Openturf', value:'Openturf'},
    {label: 'Terrapay', value:'Terrapay'},
  ]
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: colorThemes.primaryTextColor,
      fontSize: '14px',
      cursor: 'pointer',
      borderRadius: '4px',
      fontWeight: state.isSelected ? '600' : '400',
      backgroundColor: colorThemes.primaryBg,
    }),

    menuList: () => ({
      border: theme == 'light' ? '1px solid #213871' : '',
      cursor: 'pointer',
      borderRadius: '4px'
    }),


    control: (base, state) => ({
      ...base,
      height: '32px',
      fontSize: 16,
      fontWeight: 600,
      backgroundColor: colorThemes.primaryBg,
      border: state.isFocused ? '1px solid #213871' : '1px solid #A2A8BD',
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? '1px solid #122452' : '1px solid #213871',

      }
    }),

    indicatorSeparator: () => ({ display: "none" }),


    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      const color = colorThemes.primaryTextColor
      return { ...provided, opacity, color, transition };
    }
  }
  const [selectedOptions, setSelectedOptions] = useState([]);

  const customLabel = () => {
    const selectedCount = selectedOptions.length;
    if (selectedCount === 0) {
      return 'Select options';
    } else if (selectedCount === partners.length) {
      return 'All';
    } else if (selectedCount === 1) {
      return selectedOptions[0].label;
    } else {
      return `${selectedOptions[0].label} +${selectedCount - 1}`;
    }
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  const formatOptionLabel = ({ label }) => (
    <div>
      {label}
    </div>
  );
  // return (
  //   <div>
  //     <label style={selectLabelStyle} htmlFor="Select">Partners</label>
  //     <Select
  //     options={partners}
  //     value={selectedOptions}
  //     onChange={handleChange}
  //     isMulti
  //     placeholder={customLabel()}
  //     formatOptionLabel={formatOptionLabel}
      
  //   />
  //   </div>
  // )
  return (
  <div className="min-h-screen flex justify-center items-center bg-background">
    <div className="absolute top-0 w-full z-10">
      <Header />
    </div>
    {/* Routes  */}
    <Routes>
      {routes.map(route => {
        return (
          <Route path={route.path} key={route.module} element={<route.component />} />
        )
      })}
    </Routes>
  </div>
)
}


export default App
