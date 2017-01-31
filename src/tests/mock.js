import {Query} from '../query'

let expectedQuery = `
  {
    firstQuery(
      param1: "param1:value"
      param2: "param2:value"
    ) 
    {
      field1
      field2
      field3
    }
    
    secondQuery(
      paramArray: ["paramArray:Elem1", "paramArray:Elem2"],
      stringParam: "stringParam:Value",
      numericValue: -12345,
      objectValue: {
        objectKey1: "objectKey1:Value",
        objectKey2Array: ["objectKey2:Elem1", "objectKey2:Elem2"]
      }
    )
    {
      field1
      field2
      graphField3 
      {
        subField1
        subField2
        subGraphField3 
        {
          subGraphField1
          subGraphField2
        }
      }
    }
    
  }
`

let secondDataModel = {
  secondQuery: (
    args = {
      paramArray: ['paramArray:Elem1', 'paramArray:Elem2'],
      stringParam: "stringParam:Value",
      numericValue: -12345,
      objectValue: {
        objectKey1: 'objectKey1:Value',
        objectKey2Array: ['objectKey2:Elem1', 'objectKey2:Elem2']
      }
    }
  ) => [
    args,
    'field1',
    'field2',
    {
      graphField3: [
        'subField1',
        'subField2',
        {
          subGraphField3: [
            'subGraphField1',
            'subGraphField2',
          ]
        }
      ]
    }
  ]
}

let sampleQuery = [
  {
    "firstQuery": (args = {param1: 'param1:value', param2: 'param2:value'}) => [
      args,
      'field1',
      'field2',
      'field3'
    ]
  },
  secondDataModel
]

console.log(Query(sampleQuery) == expectedQuery);

