import * as React from 'react'
import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'

const listComponent = ({ vins, onAddClicked, onVinStateChange }) => {
  const [vin, setVin] = React.useState('')

  const onAdd = () => {
    if (!vin || vin.length < 17) return
    onAddClicked && onAddClicked(vin.toUpperCase())

    setVin('')
  }

  const onChecked = vin => {
    onVinStateChange && onVinStateChange(vin)
  }

  return (
    <div className="list-component columns">
      <div className="header">
        <Input
          placeholder="enter VIN"
          onChange={e => setVin(e.target.value.toUpperCase())}
          maxLength={17}
          value={vin}
        />
        <Button onClick={onAdd}>+ ADD</Button>
      </div>
      <div className="vin-list columns">
        {Object.keys(vins).map(item => {
          return (
            <Checkbox
              checked={vins[item].enabled}
              onClick={onChecked.bind(this, item)}>
              <span style={{ color: vins[item].color }}>{item}</span>
            </Checkbox>
          )
        })}
      </div>
    </div>
  )
}

export default listComponent
