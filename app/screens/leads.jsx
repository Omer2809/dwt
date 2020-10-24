import React, { Component } from "react";
import { toast } from "react-toastify";

import { GlobalContainer, Header, SearchBox } from "../common/Details";
import LeadsTable from "./leadsTable";
import { Pagination, getCurrentPage, getPagedData } from "../common/pagination";
import { getLeads, deleteLead } from "../../services/leadService.js";
import Spinner from "../common/Spinner";

class Leads extends Component {
  state = {
    leads: [],
    currentPage: 1,
    pageSize: 4,
    numberOfPageButtons: 7,
    searchQuery: "",
    numberSearchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    loading: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: leads } = await getLeads();
    this.setState({ leads, loading: false });
  }

  handleDelete = async (lead) => {
    const originalLeads = this.state.leads;
    const leads = originalLeads.filter((l) => l._id !== lead._id);

    const currentPage = getCurrentPage(
      leads,
      this.state.currentPage,
      this.state.pageSize
    );

    this.setState({ leads, currentPage });

    try {
      await deleteLead(lead._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This lead has already been deleted.");

      this.setState({ leads: originalLeads });
    }
  };
  handleNumberSearch = (query) => {
    this.setState({
      numberSearchQuery: query,
      currentPage: 1,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      numberOfPageButtons,
      numberSearchQuery,
      loading,
    } = this.state;

    const { totalCount, data: leads } = getPagedData(
      this.state,
      this.state.leads
    );

    return (
      <GlobalContainer>
        <div className="col">
          <Header name={"Lead"} totalCount={totalCount} url={"/leads/new"} />
          <div style={{ display: "flex" }}>
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder={"Search Name..."}
            />
            <SearchBox
              value={numberSearchQuery}
              onChange={this.handleNumberSearch}
              placeholder={"Search Number..."}
            />
          </div>
          <LeadsTable
            leads={leads}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          {loading && <Spinner />}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            numberOfButtons={numberOfPageButtons}
            onPageChange={this.handlePageChange}
          />
        </div>
      </GlobalContainer>
    );
  }
}

export default Leads;
