function InfoTooltip(props) {
  return(
    <div className="popup">
      <form 
        className={
          props.isOpen ? `popup__${props.type} modal modal_is-opened` 
          :
          `popup__${props.type} modal`
          } 
          name={
            `${props.name}`
          } 
          noValidate>
        <div className="popup__container">
          <button 
            type="button" 
            name="close" 
            className="button button_action_close" 
            aria-label="Закрыть" 
            onClick={props.onClose}
          >
          </button>
          {
            props.isSuccessful ? 
            <div className="popup__admin">
              <div className="popup__auth-status" style={{
                backgroundImage: `url(${props.onSuccess})`
              }} />
              <h2
                className="popup__login-heading"
              >
                {props.currentAuthType}
              </h2>
            </div>
            :
            <div className="popup__admin">
              <div className="popup__auth-status" style={{
                backgroundImage: `url(${props.onFailure})`
              }} />
              <h2 className="popup__login-heading">
                Что-то пошло не так! Попробуйте ещё раз.
              </h2>
            </div>
          }
          
        </div>
        <div className="popup__overlay" 
          onClick={props.onClose}
          onKeyPress={props.onEscPress}
        >
        </div>
      </form>
    </div>
  );
};

export default InfoTooltip;