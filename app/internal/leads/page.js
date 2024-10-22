"use client";

import { useLeads } from '../../context/LeadsContext';
import { useAuth } from '../../context/AuthContext';
import { Button, Table, TableRow, TableCell, TableBody, Typography, Box, TableHead, TableContainer, Paper, InputBase, Select, MenuItem, IconButton, TablePagination, TableSortLabel, CircularProgress, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';

const InternalLeadsList = () => {
  const { leads, fetchLeads, updateLeadState } = useLeads();
  const { isAuthenticatedAlma } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticatedAlma) {
        setIsLoading(true);
        await fetchLeads();
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticatedAlma]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleStatusChange = (event) => setStatusFilter(event.target.value);
  const handlePageChange = (event, newPage) => setPage(newPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key;

    if (sortConfig.direction === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });

  const filteredLeads = sortedLeads
    .filter((lead) =>
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.state === statusFilter : true));

  const handleUpdateStatus = (id) => {
    updateLeadState(id);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticatedAlma) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5">Access Denied</Typography>
        <Typography variant="body1">Please log in to view this page.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" height="100vh">
      <Box width="200px" bgcolor="#f5f5f5" p={3} display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
        <Box>
          <Typography variant="h6" gutterBottom>Leads</Typography>
          <Typography variant="body2">Settings</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
          <Avatar>A</Avatar>
          <Typography variant="body1">Admin</Typography>
        </Box>
      </Box>

      <Box flex={1} p={3}>
        <Typography variant="h4" gutterBottom>Leads</Typography>

        <Box display="flex" gap={2} mb={2}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <IconButton sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            displayEmpty
            sx={{ width: 150 }}
          >
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="REACHED_OUT">Reached Out</MenuItem>
          </Select>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Submitted</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Country</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.firstName} {lead.lastName}</TableCell>
                  <TableCell>{lead.submitted}</TableCell>
                  <TableCell>{lead.state}</TableCell>
                  <TableCell>{lead.country}</TableCell>
                  <TableCell>
                    {lead.state === 'PENDING' && (
                      <Button
                        onClick={() => handleUpdateStatus(lead.id)}
                        variant="contained"
                        color="primary"
                      >
                        Mark as Reached Out
                      </Button>
                    )}
                    {lead.state === 'REACHED_OUT' && (
                      <Typography variant="body2" color="textSecondary">Reached Out</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredLeads.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
};

export default InternalLeadsList;
