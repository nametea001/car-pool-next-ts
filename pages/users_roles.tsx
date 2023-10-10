import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

// css
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import { Container } from "react-bootstrap";

// datatable
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

function userRole({ propDataUsersRole }: any) {
  const router = useRouter();

  // datatable
  const [dataUsersRole, setDataUsersRole]: any[] = useState(propDataUsersRole);

  // datatable
  function Datatable() {
    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      user_role_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      // status: { value: null, matchMode: FilterMatchMode.EQUALS },
      // status: { value: null, matchMode: FilterMatchMode.EQUALS },
      // verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const renderHeader = () => {
      return (
        <div className="d-flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      );
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let _filters = { ...filters };
      // @ts-ignore
      _filters["global"].value = value;
      setFilters(_filters);
      setGlobalFilterValue(value);
    };
    // table
    return (
      <>
        <div className="data-table ">
          <DataTable
            value={dataUsersRole}
            responsiveLayout="scroll"
            showGridlines
            stripedRows
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            removableSort
            scrollable
            scrollHeight="flex"
            resizableColumns
            columnResizeMode="expand"
            emptyMessage="No data found."
            header={renderHeader}
            filters={filters}
            globalFilterFields={["user_role_name"]}
          >
            <Column field="user_role_name" header="Role Name" sortable />
            <Column
              header="Actions"
              body={
                (data, props) => (
                  <div>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        // showEditUser(data);
                      }}
                    >
                      <FontAwesomeIcon icon={IconSolid.faPenToSquare} />
                    </Button>
                  </div>
                )
                // data.username
              }
            />
          </DataTable>
        </div>

        {/* edit user */}
      </>
    );
  }
  // page
  return (
    <Container fluid className="content">
      <Head>
        <title> Master | User Roles </title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>
            <FontAwesomeIcon icon={IconSolid.faUserFriends} />
            User Roles
          </h1>
          <hr />
          {/* <DataTables /> */}
          {Datatable()}
        </div>
      </div>
    </Container>
  );
}

userRole.auth = true;

import { UserRoleFinder } from "../src/Domain/UserRole/Service/UserRoleFinder";

export async function getServerSideProps() {
  const userRoleFinder = new UserRoleFinder();
  const propDataUsersRole = await userRoleFinder.findUsersRoles({});
  return {
    props: { propDataUsersRole }, // will be passed to the page component as props
  };
}

export default userRole;
