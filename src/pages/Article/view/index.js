import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
import { useFormTable } from '@umijs/hooks'
// import { PaginatedParams } from '@umijs/hooks/lib/useFormTable'

class ArticleList extends PureComponent {
  state = {
    current: 1,
    pageSize: 10,
    searchObj: {
      name: '',
      startOrderDate: '',
      endOrderDate: ''
    }
  };
  componentDidMount() {
    console.log('this.props', this.props)
    this.filterPostList({});
  }

  filterPostList = (obj) => {
    const { dispatch } = this.props;
    dispatch(getPostList({ page: obj.page || 1, pageSize: obj.pageSize || 10 }));
  };

  onChangePagination = newPage => {

    const { Option } = Select;



    const getTableData = ({ current, pageSize }, formData) => {
      let query = `page=${current}&size=${pageSize}`;
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          query += `&${key}=${value}`
        }
      });

      return fetch(`https://randomuser.me/api?results=55&${query}`)
        .then(res => res.json())
        .then(res => ({
          total: res.info.results,
          list: res.results,
        }));
    };

    const AppList = (props) => {
      let [form] = Form.useForm();
      const { tableProps, search, loading } = useFormTable(getTableData, {
        defaultPageSize: 5,
        form: form,
      });

      console.log('loading', loading, search);

      const { type, changeType, submit, reset } = search;

      const columns = [
        {
          title: 'name',
          dataIndex: 'name.first',
          render: (value, record) => {
            // console.log(111,value,record)
            return <span>{record.name.first} {record.name.last} </span>;
          }
        },
        {
          title: 'email',
          dataIndex: 'email',
        },
        {
          title: 'phone',
          dataIndex: 'phone',
        },
        {
          title: 'gender',
          dataIndex: 'gender',
        },
      ];

      <Table
        className="mo-table"
        rowKey="id"
        columns={columns}
        // dataSource={postList.data || []}
        dataSource={postList || []}

        loading={fetchListPending}
        pagination={{
          current,
          total,
          // showTotal: this.showTotal,
          // size: 'small',
          showSizeChanger: true,
          onChange: this.onChangePagination,
          onShowSizeChange: this.onShowSizeChange
        }}
      />
            </div >

    }
}

const mapStateToProps = state => {
  // debugger
  return {
    postList: state.postList.postList
  }
};

const advanceSearchForm = (
  <div>
    <Form form={form}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="name" name='name'>
            <Input placeholder="name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="email" name="email">
            <Input placeholder="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="phone" name="phone">
            <Input placeholder="phone" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" onClick={submit}>
            Search
          </Button>
          <Button onClick={reset} style={{ marginLeft: 16 }}>
            Reset
          </Button>
          <Button type="link" onClick={changeType}>
            Simple Search
          </Button>
        </Form.Item>
      </Row>
    </Form>
  </div>
);

const searchForm = (
  <div style={{ marginBottom: 16 }}>
    <Form
      form={form}
      // initialValues={{gender:'male'}}
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Form.Item
        name="gender"
        initialValue='female'
      >
        <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
          <Option value="">all</Option>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
        </Select>
      </Form.Item>
      <Form.Item name="name">
        {/* <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} allowClear/> */}
        <Input placeholder="enter name" style={{ width: 240 }} allowClear />
      </Form.Item>
      <Form.Item name="name">
        <Button type="primary" onClick={submit}>Search</Button>
        {/* <Input placeholder="enter name" style={{ width: 240 }} allowClear/> */}
      </Form.Item>
      <Button type="link" onClick={changeType}>
        Advanced Search
      </Button>
    </Form>
  </div>
);

return (
  <div>
    {type === 'simple' ? searchForm : advanceSearchForm}
    <Table columns={columns} rowKey="email" {...tableProps} />
  </div>
);
};

export default AppList;
