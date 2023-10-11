import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import * as pBt from "primereact/button";
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
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";

export default function VerifyUsers({ propData, propDataUsersRole }: any) {
  // datatable
  const [dataVerifyUser, setDataVerifyUser] = useState(propData);
  const [dataUsersRole, setDataUsersRole] = useState(propDataUsersRole);

  // datatable
  function Datatable() {
    const [showVerifyUser, setShowVerifyUser] = useState<boolean>(false); //show modal
    const [verifyUserData, setVerifyUserData] = useState<any>({});

    const [verifyUserDataUpdate, setVerifyUserDataUpdate] = useState<any>({});

    // model for search
    const now = new Date();
    const [startDate, setStartDate] = useState<Nullable<Date>>(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 30,
        23,
        59,
        59
      )
    );
    const [endDate, setEndDate] = useState<Nullable<Date>>(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 30,
        23,
        59,
        59
      )
    );

    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      "users.first_name": {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      "users.email": {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      "users.user_roles.user_role_name": {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      status: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      // status: { value: null, matchMode: FilterMatchMode.EQUALS },
      // status: { value: null, matchMode: FilterMatchMode.EQUALS },
      // verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    // dateupdate

    const renderHeader = () => {
      return (
        <div className="d-flex justify-content-between">
          <pBt.Button
            type="button"
            icon="pi pi-bars"
            label="Search"
            outlined
            className="teal-500"
            onClick={() => {}}
          />
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
    let dataUpdateVerifyUser: any = null;
    return (
      <>
        <div className="data-table">
          <DataTable
            value={dataVerifyUser}
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
            globalFilterFields={[
              "users.first_name",
              "users.email",
              "users.user_roles.user_role_name",
              "status",
            ]}
          >
            <Column
              field="users.first_name"
              header="Name"
              body={(data, prop) =>
                `${data.users.first_name} ${data.users.last_name}`
              }
              sortable
            />
            <Column field="users.email" header="Email" sortable />
            <Column
              field="users.user_roles.user_role_name"
              header="User Role"
              sortable
            />
            {/* <Column field="description" header="Description" sortable /> */}
            <Column field="status" header="Status" sortable />
            <Column
              header="Actions"
              body={(data, props) => (
                <div>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      setVerifyUserData(data);
                      setShowVerifyUser(true);
                      setVerifyUserDataUpdate({
                        id: data.id,
                        status: data.status,
                        user_role_id: data.users.user_role_id,
                        description: data.description,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={IconSolid.faIdBadge} />
                  </Button>
                </div>
              )}
            />
          </DataTable>
        </div>
        {/* verify */}
        <Modal
          show={showVerifyUser}
          onHide={() => {
            setShowVerifyUser(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Verify User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={`${verifyUserData.users?.first_name} ${verifyUserData.users?.last_name}`}
                  placeholder="Name"
                  autoComplete="off"
                  disabled
                  // autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={verifyUserData.users?.email}
                  placeholder="name@example.com"
                  autoComplete="off"
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Role</Form.Label>
                <Form.Select
                  defaultValue={verifyUserData.users?.user_role_id}
                  onChange={(e) => {
                    verifyUserDataUpdate.user_role_id = Number(e.target.value);
                    setVerifyUserDataUpdate(verifyUserDataUpdate);
                  }}
                >
                  {dataUsersRole.map((data: any) => {
                    if (data.id >= 3) {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.user_role_name}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  defaultValue={verifyUserData.status}
                  onChange={(e) => {
                    verifyUserDataUpdate.status = e.target.value;
                    setVerifyUserDataUpdate(verifyUserDataUpdate);
                  }}
                >
                  <option value={"NEW"}>NEW</option>
                  <option value={"USER"}>USER</option>
                  <option value={"DRIVER"}>DRIVER</option>
                  <option value={"NOT_VERIFY"}>NOT VERIFY</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={verifyUserData.description}
                  // placeholder="name@example.com"
                  as="textarea"
                  aria-label="With textarea"
                  autoComplete="off"
                  onChange={(e) => {
                    verifyUserDataUpdate.description = e.target.value;
                    setVerifyUserDataUpdate(verifyUserDataUpdate);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-center">
                  <a
                    className="pe-3"
                    href={`/api/verify_users/pdf_path?path=users/${verifyUserData.id_card_path}`}
                    target="_blank"
                  >
                    OpenFile ID Card
                  </a>
                  <a
                    className=""
                    href={`/api/verify_users/pdf_path?path=drivers/${verifyUserData.driver_licence_path}`}
                    target="_blank"
                  >
                    OpenFile Driver Licence
                  </a>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                setShowVerifyUser(false);
                UpdateVerfifyUser(verifyUserDataUpdate);
              }}
              // disabled={false}
            >
              Verify
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setShowVerifyUser(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  // page
  return (
    <Container fluid className="content">
      <Head>
        <title> Verify Users </title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>
            <FontAwesomeIcon icon={IconSolid.faIdBadge} />
            Verify Users
          </h1>
          <hr />
          {/* <DataTables /> */}
          {Datatable()}
        </div>
      </div>
    </Container>
  );

  async function UpdateVerfifyUser(data: any) {
    const url = `http://localhost:3000/api/verify_users/update_verify`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Convert your data to JSON
      });

      if (res.ok) {
        const updatedData = await res.json();
        const verifiedData = updatedData.verify_user;
        const updatedList = [...dataVerifyUser];
        const index = updatedList.findIndex(
          (item) => item.id === verifiedData.id
        );
        if (index !== -1) {
          updatedList[index] = verifiedData;
          setDataVerifyUser(updatedList);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Example usage:
  }
}

VerifyUsers.auth = true;

import { VerifyUserFinder } from "../src/Domain/VerifyUser/Service/VerifyUserFinder";
import { UserRoleFinder } from "../src/Domain/UserRole/Service/UserRoleFinder";

export async function getServerSideProps() {
  let now = new Date();
  let datetimeStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );
  let datetimeEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 30,
    23,
    59,
    59
  );
  datetimeStart.setHours(datetimeStart.getHours());
  datetimeEnd.setHours(datetimeEnd.getHours());
  const userRoleFinder = new UserRoleFinder();
  const verifyUserFinder = new VerifyUserFinder();
  const propData = await verifyUserFinder.findUserVerifys({
    updated_at: { gte: datetimeStart, lte: datetimeEnd },
  });
  const propDataUsersRole = await userRoleFinder.findUsersRoles({});
  return {
    props: { propData, propDataUsersRole }, // will be passed to the page component as props
  };
}
