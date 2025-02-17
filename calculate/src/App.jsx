import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const SalaryCalculator = () => {
  const [salary, setSalary] = useState('');
  const [bonus, setBonus] = useState('');
  const [districtCoeff, setDistrictCoeff] = useState('');
  const [workDays, setWorkDays] = useState('');
  const [workedDays, setWorkedDays] = useState('');
  const [results, setResults] = useState({
    full: '',
    ndfl: '',
    net: ''
  });
  const [errors, setErrors] = useState({
    salary: false,
    workDays: false,
    workedDays: false
  });

  const validateFields = () => {
    const newErrors = {
      salary: !salary,
      workDays: !workDays,
      workedDays: !workedDays
    };
    setErrors(newErrors);
    return Object.values(newErrors).some(error => error);
  };

  const calculateSalary = () => {
    if (validateFields()) return;

    const baseSalary = parseFloat(salary);
    const bonusValue = bonus ? parseFloat(bonus) : 0;
    const districtMultiplier = districtCoeff ? 1 + parseFloat(districtCoeff) / 100 : 1;
    const daysRatio = parseFloat(workedDays) / parseFloat(workDays);

    const full = (baseSalary * districtMultiplier * daysRatio) + bonusValue;
    const ndfl = full * 0.13;
    const net = full - ndfl;

    setResults({
      full: full.toFixed(2),
      ndfl: ndfl.toFixed(2),
      net: net.toFixed(2)
    });
  };

  return (
    <div className="calculator-container">
      <h1>Калькулятор заработной платы</h1>

      <div className="input-group">
        <label>Оклад (тенге)*</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className={errors.salary ? 'error-input' : ''}
        />
        {errors.salary && <span className="error-message">Обязательное поле</span>}
      </div>

      <div className="input-group">
        <label>Премия (тенге)</label>
        <input
          type="number"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Районный коэффициент (%)</label>
        <input
          type="number"
          value={districtCoeff}
          onChange={(e) => setDistrictCoeff(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Рабочих дней в месяце*</label>
        <input
          type="number"
          value={workDays}
          onChange={(e) => setWorkDays(e.target.value)}
          className={errors.workDays ? 'error-input' : ''}
        />
        {errors.workDays && <span className="error-message">Обязательное поле</span>}
      </div>

      <div className="input-group">
        <label>Отработанных дней*</label>
        <input
          type="number"
          value={workedDays}
          onChange={(e) => setWorkedDays(e.target.value)}
          className={errors.workedDays ? 'error-input' : ''}
        />
        {errors.workedDays && <span className="error-message">Обязательное поле</span>}
      </div>

      <button onClick={calculateSalary} className="btn calculate-btn">
        Рассчитать зарплату
      </button>

      <div className="results-section">
        <div className="result-item">
          <span>Полная зарплата:</span>
          <input type="text" value={results.full} readOnly />
        </div>
        <div className="result-item">
          <span>НДФЛ (13%):</span>
          <input type="text" value={results.ndfl} readOnly />
        </div>
        <div className="result-item">
          <span>На руки:</span>
          <input type="text" value={results.net} readOnly />
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;