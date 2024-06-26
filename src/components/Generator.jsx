import React, { useState, useEffect, useRef } from 'react'; // Line 1

import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import Button from './Button'

function Header(props) {
  const { index, title, description } = props
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl '>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  )

}

export default function Generator(props) {
  const { muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout } = props
  const [showModal, setShowModal] = useState(false)
  const modalRef = useRef(null); // Line 18

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.classList.contains('genz')) {
        setShowModal(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]); // Lines 19-29
  

  
  
  

    // let showModal = false

    function toggleModal() {
        setShowModal(!showModal)
    }

    function updateMuscles(muscleGroup) {
      
      if (muscles.includes(muscleGroup)) {
        setMuscles(muscles.filter(val => val !== muscleGroup))
        return
      }

      if(muscles.length > 2) {
        return
      }

      if (poison !== 'individual') {
        setMuscles([muscleGroup])
        setShowModal(false)
        return
      }

      if (muscles.length === 2) {
        setShowModal(false)
      }
      
        setMuscles([...muscles, muscleGroup])
        if(muscles.length === 3){
          setShowModal(false)
        }

    


    }

  return (
    
    <SectionWrapper id={'generate'} header={"generate your workout"} title={['It\'s','Huge', 'o\'clock']}>
      <Header index={'01'} title={'Pick your Position'} description={"Select the workout you wish to endure."} />
       <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
       
       {Object.keys(WORKOUTS).map((type, typeIndex) => {
        return (
          <button onClick={() => {
            setMuscles([])
            setPoison(type)
          }  } className={'bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' + (type === poison ? ' border-blue-600 text-blue-300' : ' border-blue-400')} key={typeIndex}>
            <p className='capitalize'>{type.replaceAll('_'," ")}</p>
          </button>
        )
       })}
       </div>

       <Header index={'02'} title={'Lock on targets'} description={"Select the muscles judged for annihilation."} />
       <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col' ref={modalRef}> 

      <button onClick={toggleModal} className='genz relative py-3 flex items-center justify-center'>
        <p className='capitalize'>{muscles.length === 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
        <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-angles-down"></i>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${showModal ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className='flex flex-col px-3 pb-3'>
          {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => (
            <button
              onClick={() => updateMuscles(muscleGroup)}
              key={muscleGroupIndex}
              className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}
            >
              <p className='uppercase py-0.5'>{muscleGroup.replaceAll('_', ' ')}</p>
            </button>
          ))}
        </div>
      </div>
    </div>

       <Header index={'03'} title={'Become juggernaut'} description={"Select your ultimate objective"} />
       <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
       
       {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
        return (
          <button onClick={() => {
            setGoal(scheme)
          }  } className={'bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' + (scheme === goal ? ' border-blue-600 text-blue-300' : ' border-blue-400')} >
            <p className='capitalize'>{scheme.replaceAll('_'," ")}</p>
          </button>
        )
       })}
       </div>

       <Button func={updateWorkout} text ={"Formulate"}></Button>
       
    </SectionWrapper>
     
  )
}