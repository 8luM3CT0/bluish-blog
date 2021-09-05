function WidgetTitle ({ Icon, title }) {
  return (
    <div
      className='
        hidden
        xl:inline-flex 
        items-center 
        space-x-4
        py-2 
        cursor-pointer 
        hover:text-blue-100'
    >
      <Icon className='h-10 text-blue-200' />
      <h2 className='font-semibold text-blue-200 h-8'>{title}</h2>
    </div>
  )
}

export default WidgetTitle
