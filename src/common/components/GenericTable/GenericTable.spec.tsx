import { render } from '@testing-library/react';
import { GenericTable } from './GenericTable';
import { CustomRenderer, TableHeader } from './types';

type TestTableItem = {
  id: number;
  firstName: string;
  lastName: string;
};

const testTableItems: TestTableItem[] = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Alice', lastName: 'Smith' },
  { id: 3, firstName: 'Bob', lastName: 'Dylan' },
];

const testTableHeaders: TableHeader<TestTableItem>[] = [
  { key: 'firstName', label: 'FIRST NAME' },
  { key: 'lastName', label: 'LAST NAME' },
];

describe('GenericTable', () => {
  it('should render one table element', () => {
    const { container } = render(<GenericTable<TestTableItem> items={[]} headers={testTableHeaders} />);
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelectorAll('table')).toHaveLength(1);
  });

  it('should render one thead element', () => {
    const { container } = render(<GenericTable<TestTableItem> items={[]} headers={testTableHeaders} />);
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelectorAll('thead')).toHaveLength(1);
  });

  it('should render one tbody element', () => {
    const { container } = render(<GenericTable<TestTableItem> items={[]} headers={testTableHeaders} />);
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelectorAll('tbody')).toHaveLength(1);
  });

  it('should render a th tag for each object in headers prop', () => {
    const { container } = render(<GenericTable<TestTableItem> items={[]} headers={testTableHeaders} />);
    const headers = container.querySelectorAll('th');
    expect(headers).toHaveLength(testTableHeaders.length);
  });

  it('should render the correct text in each header column', () => {
    const { container } = render(<GenericTable<TestTableItem> items={[]} headers={testTableHeaders} />);
    const headers = container.querySelectorAll('th');
    headers.forEach((th, index) => {
      expect(th.textContent).toBe(testTableHeaders[index].label);
    });
  });

  it('should not render any rows in the table body if the items prop is an empty array', () => {
    const { container } = render(<GenericTable<TestTableItem> items={[]} headers={testTableHeaders} />);
    const tbody = container.querySelector('tbody');
    const rows = tbody?.querySelectorAll('tr');
    expect(rows).toHaveLength(0);
  });

  it('should render "No data" text if the items prop is an empty array', () => {
    const { getByText } = render(<GenericTable<TestTableItem> items={[]} headers={testTableHeaders} />);
    expect(getByText('No data')).toBeInTheDocument();
  });

  it('should not render "No data" text if the items prop is not an empty array', () => {
    const { queryByText } = render(<GenericTable<TestTableItem> items={testTableItems} headers={testTableHeaders} />);
    expect(queryByText('No data')).toBeNull();
  });

  it('should render a row in the table body for each item in the items prop', () => {
    const { container } = render(<GenericTable<TestTableItem> items={testTableItems} headers={testTableHeaders} />);
    const tbody = container.querySelector('tbody');
    const rows = tbody?.querySelectorAll('tr');
    expect(rows).toHaveLength(testTableItems.length);
  });

  it('should render the correct data in each column of the rows', () => {
    const { container } = render(<GenericTable<TestTableItem> items={testTableItems} headers={testTableHeaders} />);
    const tbody = container.querySelector('tbody');
    const rows = tbody?.querySelectorAll('tr');

    rows?.forEach((row, rowIndex) => {
      const tds = row.querySelectorAll('td');
      tds.forEach((td, colIndex) => {
        const item = testTableItems[rowIndex];
        const { key } = testTableHeaders[colIndex];
        expect(td.innerHTML).toBe(item[key]);
      });
    });
  });

  it('should use custom render method if customRenderers prop is provided', () => {
    const customRenderers: CustomRenderer<TestTableItem>[] = [
      {
        key: 'firstName',
        renderer: (item: TestTableItem) => `${item.id}`,
      },
    ];

    const { container } = render(
      <GenericTable<TestTableItem>
        items={testTableItems}
        headers={testTableHeaders}
        customRenderers={customRenderers}
      />,
    );

    const tbody = container.querySelector('tbody');
    const rows = tbody?.querySelectorAll('tr');

    rows?.forEach((row, rowIndex) => {
      const tds = row.querySelectorAll('td');
      tds.forEach((td, colIndex) => {
        const item = testTableItems[rowIndex];
        const { key } = testTableHeaders[colIndex];
        const expected = key === 'firstName' ? customRenderers[0].renderer(item) : item[key];
        expect(td.innerHTML).toBe(expected);
      });
    });
  });
});
