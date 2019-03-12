// import { unique, isTextNodeLike, NodeLike, isElementLike, JSXAloneJsonImpl, jsonImplOutputElAsHtml } from 'jsx-alone-core';
// import { JSXAlone } from 'jsx-alone-dom';
// import { Component } from '../util/component';
// import { stateUpdateId } from '../../main';
// function findDescendant(n: NodeLike<any>, p: (d:NodeLike<any>)=>boolean, includeSelf=false): NodeLike<any>|undefined{
//   if(includeSelf&&p(n)){
//     return n
//   }
//   if(isElementLike(n)){
//     return n.children.find(c=>!!findDescendant(c, p, true)) as any
//   }
//   // return (p(n) ? n : (isElementLike(n) ? n.children.find(c=>p(c as any)) : undefined))  as N|undefined
// }
// interface P { children: () => (JSX.Element | JSX.Element[]), amount: number, id?: string }
// export class Virtual extends Component<P> {
//   render() {
//     const id = (this.props.id || unique('virtual')) + '_' + stateUpdateId
//     if (!Virtual.ids[id]) {
//       Virtual.ids[id] = { id, amount: this.props.amount || -1, currentAmount: 0 , foundLeave: false}
//     }
//     const v = Virtual.ids[id]
//     // important - increment `this` before children - top-down
//     const r: JSX.Element | JSX.Element[] = Array.isArray(this.props.children) ? this.props.children[0]() : this.props.children()
//     const rr = !r ? [] : Array.isArray(r) ? r[0] : r as any
//     // if(){
//       // foundLeave=true
//       // }
//       // let foundLeave = !!rr.find(dd=>!!findDescendant(dd, d=>isTextNodeLike(d))
      
//       // console.log(findDescendant(rr, d=>isElementLike(d)&&d.attrs['data-currentAmount']=='1'));
      
      
      
//       if (v.amount === -1 || v.currentAmount <= v.amount 
//         || findDescendant(rr, d=>isElementLike(d)&&d.attrs['data-virtual']==id+'_'+'1')
//         // ||!v. foundLeave
//         ) {
          
//           // if (v.currentAmount > v.amount) {
//             // v. foundLeave=v.foundLeave||!!rr.find(dd=>!!findDescendant(dd, d=> isTextNodeLike(d)))
            
//             // debugger
//             // }
//             const result= <div data-virtual={id+'_'+v.currentAmount}  onMouseUp={e => {
//               // debugger
//               // Virtual.ids[id].amount = -1
//               // this.updateProps({ amount: -1 })
//             }
//           }>
//         {/* {v.currentAmount } */}
//         {r}
//       </div>
//           v.currentAmount++
 
// //  if(!v.foundLeave){
// //    //  // const findDescendant(dd, d=> isTextNodeLike(d)
//     // var hasLeave =!!rr.find(dd=>!!findDescendant(dd, d=> isTextNodeLike(d)))
// //    //  var hasVirtual = !!rr.find(dd=>!!findDescendant(dd, d=> isElementLike(d)&&d.attrs['data-type']==='virtual'))
// //    // result._
//   //  var hasLeave = findDescendant(rr as any, d=> isTextNodeLike(d))
// //    var hasVirtual = findDescendant(result as any, d=> isElementLike(d)&&d.attrs['data-type']==='virtual')
// //    //  debugger
//   //  v. foundLeave= !!(hasLeave&&!hasVirtual)
//   // v.foundLeave=!!hasLeave
// //    console.log(hasLeave, hasVirtual, jsonImplOutputElAsHtml(result as any));
   
//    // }
//   // }
//   return result
//     }
//     else {
//       // debugger
//       return <div>
//         {/* { v.currentAmount } */}
//       </div>
//     }

//   }
//   protected static ids: { [i: string]: { id: string, amount: number, currentAmount: number, foundLeave: boolean } } = {}
// }
