import { FILTER, STATUS } from "./constant";
import SearchBox from "../SearchBox/SearchBox";
import Select from "../Select/Select";
const AllSchoolsHeader = (props:{
  searchValue:string,
  setSearchValue:(searchValue:string)=>void,
  searchTerm:string,
  staticInformation:string,
  setInformation:(information:string)=>void,
  searchHandler:()=>void
}) => {
  return (

    <div className="flex-header">
      <div>
        <SearchBox
          placeHolder="Buscar escuelas según ID, nombre y..."
          searchValue={props.searchValue}
          setSearchValue={props.setSearchValue}
          searchTerm={props.searchTerm}
          staticInformation={props.staticInformation}
          setInformation={props.setInformation}
          handleSearch={props.searchHandler}
        />
      </div>
      <div>
        <Select
          title="Filtro"
          selectWidth={300}
          size="small"
          value={props.searchTerm}
          setValue={props.setSearchTerm}
          data={FILTER}
        />
      </div>
      <div>
        <Select
          title="Estado de la escuela"
          selectWidth={300}
          size="small"
          value={props.schoolFilter}
          setValue={props.setSchoolFilter}
          data={STATUS}
        />
      </div>
    </div>

  );
};

export default AllSchoolsHeader;
