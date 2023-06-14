import { Popup } from 'antd-mobile'
import React, { ForwardedRef, forwardRef, memo, Ref, useCallback, useImperativeHandle, useState } from 'react'

interface BasePopupProps {
  children: {
    popupContent: React.ReactElement
    base?: React.ReactElement
  }
}

export interface BasePopupRef {
  open: () => void
}


function BasePopup(props: BasePopupProps, ref: Ref<BasePopupRef>) {
  const [visible, trigger] = useState(false);

  const open = useCallback(() => {
    trigger(true)
  }, [])

  useImperativeHandle(ref, () => ({
    open
  }))

  const { base, popupContent } = props.children

  return (<>
    {
      React.cloneElement(base!)
    }
    <Popup
      visible={visible}
      onMaskClick={() => {
        trigger(false)
      }}
    >
      <div className=''></div>
      {
        React.cloneElement(popupContent)
      }
    </Popup>
  </>
  )
}

export default memo(forwardRef(BasePopup))