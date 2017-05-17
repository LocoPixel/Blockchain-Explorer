/**
 * Created by haseeb on 19/04/2017.
 */
import React from 'react';

import { Button, Divider } from 'semantic-ui-react'

export const BlocksPagination= ({currentpage, maxpage , onNavigate}) => {


  return(
          <Button.Group basic>
            <Button  onClick={onNavigate.bind(this , 1)} >First</Button>
            <Button disabled={currentpage <= 1} onClick={onNavigate.bind(this , currentpage-1)} >Previous</Button>
            <Button disabled= {true}>{currentpage} of {maxpage}</Button>
            <Button disabled={currentpage >= maxpage} onClick={onNavigate.bind(this , currentpage+1)} >Next</Button>
            <Button onClick={onNavigate.bind(this , maxpage)} >Last</Button>
          </Button.Group>
  )
};
