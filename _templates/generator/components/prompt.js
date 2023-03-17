module.exports = [
  {
    type: 'select',
    name: 'directory',
    message: "どのディレクトリに生成しますか？",
    choices: ['components'],
  },
  {
    type: 'input',
    name: 'directory_name',
    message: 'サブディレクトリを入力してください',
    validate: (input) => input !== '',
  },
  {
    type: 'input',
    name: 'component_name',
    message: 'コンポーネント名を入力してください',
    validate: (input) => input !== '',
  },
]
