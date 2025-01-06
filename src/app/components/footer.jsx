import './style.css'

const Footer = () => {
    return (
        <div className='w-full h-[50vh] bg-[#050505]'>
            <div className="container grid grid-cols-2 items-center justify-between p-3">
                <div className="flex flex-col gap-2">
                    <i>
                        <h1 className="text-white text-[25px] font-extrabold sm:text-[30px]">Floxsy</h1>
                    </i>
                </div>
            </div>
        </div>
    )
}

export default Footer