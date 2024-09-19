const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.1 HW3 Template' });
});

// 1
async function fetchAllCompanies() {
  let query = 'SELECT * FROM companies';
  let result = await db.all(query, []);

  return { companies: result };
}

app.get('/companies', async (req, res) => {
  try {
    let response = await fetchAllCompanies();

    if (response.companies.length === 0) {
      return res.status(404).json({ message: 'No companies found.' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2
async function fetchCompaniesByIndustry(industry) {
  let query = 'SELECT * FROM companies WHERE industry = ?';
  let result = await db.all(query, [industry]);

  return { companies: result };
}

app.get('/companies/industry/:industry', async (req, res) => {
  try {
    let industry = req.params.industry;
    let response = await fetchCompaniesByIndustry(industry);

    if (response.companies.length === 0) {
      return res.status(404).json({ message: 'No companies found.' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3
async function fetchCompaniesByRevenue(minRevenue, maxRevenue) {
  let query = 'SELECT * FROM companies WHERE revenue >= ? AND revenue <= ?';
  let result = await db.all(query, [minRevenue, maxRevenue]);

  return { companies: result };
}

app.get('/companies/revenue', async (req, res) => {
  try {
    let minRevenue = req.query.minRevenue;
    let maxRevenue = req.query.maxRevenue;

    let response = await fetchCompaniesByRevenue(minRevenue, maxRevenue);

    if (response.companies.length === 0) {
      return res.status(404).json({ message: 'No companies found.' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4
async function fetchCompaniesByEmployeesCount(employeesCount) {
  let query = 'SELECT * FROM companies WHERE employee_count < ?';
  let result = await db.all(query, [employeesCount]);

  return { companies: result };
}

app.get('/companies/employees/:employeesCount', async (req, res) => {
  try {
    let employeesCount = req.params.employeesCount;
    let response = await fetchCompaniesByEmployeesCount(employeesCount);

    if (response.companies.length === 0) {
      return res.status(404).json({ message: 'No companies found.' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5
async function fetchCompaniesByfoundedYear(founded_year) {
  let query = 'SELECT * FROM companies WHERE founded_year = ?';
  let result = await db.all(query, [founded_year]);

  return { companies: result };
}

app.get('/companies/founded_year/:founded_year', async (req, res) => {
  try {
    let founded_year = req.params.founded_year;
    let response = await fetchCompaniesByfoundedYear(founded_year);

    if (response.companies.length === 0) {
      return res.status(404).json({ message: 'No companies found.' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PORT
app.listen(PORT, () => {
  console.log('Server is running on Port 3000');
});
