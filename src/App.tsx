import { ReactComponent as CheckIcon } from "./assets/check-solid.svg";
import { ReactComponent as XMarkIcon } from "./assets/xmark-solid.svg";
import { useForm, valitaionMessages, ValidationParameter } from "./useForm";

const App: React.FC = () => {
  const { onChange, isFormValid, form, errors } = useForm();
  return (
    <div>
      <nav>Registration</nav>
      <main>
        <form onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
          <div className="input-control">
            <label>
              Email
              <input
                defaultValue={form.email}
                onChange={onChange}
                placeholder="email"
                type="email"
                name="email"
              />
            </label>

            <div>
              <label>
                Password
                <input
                  defaultValue={form.password}
                  onChange={onChange}
                  placeholder="password"
                  type="password"
                  name="password"
                />
              </label>

              <div className="error-container">
                {Object.keys(valitaionMessages).map((stateKey) => (
                  <div className="error-item" key={stateKey}>
                    {errors.password[stateKey as ValidationParameter] ? (
                      <CheckIcon className="check-icon" />
                    ) : (
                      <XMarkIcon className="xmark-icon" />
                    )}
                    {valitaionMessages[stateKey as ValidationParameter]}
                  </div>
                ))}
              </div>

              <button type="submit" disabled={!isFormValid}>
                Continue with login
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default App;
