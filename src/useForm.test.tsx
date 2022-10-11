import { renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import { useForm } from "./useForm";

describe("useForm", () => {
  it("Should set email valition to true when invalide email is provided", () => {
    const { result } = renderHook(useForm);

    act(() => {
      result.current.onChange({
        target: { name: "email", value: "clins@gmail.com" },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.email).toBe("clins@gmail.com");
    expect(result.current.errors.email).toBe(true);
    expect(result.current.isFormValid).toBe(false);
  });

  it("Should set email valition to false when invalid email is provided", () => {
    const { result } = renderHook(useForm);

    act(() => {
      result.current.onChange({
        target: { name: "email", value: "clins@.com" },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.email).toBe("clins@.com");
    expect(result.current.isFormValid).toBe(false);
  });

  it("Should be valid when calid email and password is provided", () => {
    const { result } = renderHook(useForm);
    act(() => {
      result.current.onChange({
        target: { name: "password", value: "clins" },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.form.password).toBe("clins");
    expect(result.current.errors.password.minCharacters).toBe(false);
  });

  it("Should be valid when calid email and password is provided", () => {
    const { result } = renderHook(useForm);
    act(() => {
      result.current.onChange({
        target: { name: "password", value: "clinsmann" },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.form.password).toBe("clinsmann");
    expect(result.current.errors.password.minCharacters).toBe(true);
    expect(result.current.errors.password.lowercaseLetters).toBe(true);
    expect(result.current.errors.password.uppercaseLetters).toBe(false);
  });


  it("Should be valid when calid email and password is provided", () => {
    const { result } = renderHook(useForm);
    act(() => {
      result.current.onChange({
        target: { name: "password", value: "Clinsmann!1" },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.form.password).toBe("Clinsmann!1");
    expect(result.current.errors.password.minCharacters).toBe(true);
    expect(result.current.errors.password.specialCharacters).toBe(true);
    expect(result.current.errors.password.decimalCharacters).toBe(true);
  });

  it("Should be valid when calid email and password is provided", () => {
    const { result } = renderHook(useForm);

    act(() => {
      result.current.onChange({
        target: { name: "email", value: "clins@gmail.com" },
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.onChange({
        target: { name: "password", value: "Clins1231!" },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.password).toBe("Clins1231!");
    expect(result.current.isFormValid).toBe(true);
  });
});
