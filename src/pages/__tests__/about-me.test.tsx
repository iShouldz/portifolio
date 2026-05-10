import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AboutContact from "@/pages/about-me/about-me"
import emailjs, { type EmailJSResponseStatus } from "@emailjs/browser"
import { toast } from "sonner"
import { describe, expect, it, vi } from "vitest"

const createDeferred = () => {
  let resolve: (value?: unknown) => void
  const promise = new Promise((res) => {
    resolve = res
  })
  return { promise, resolve: resolve! }
}

describe("About/Contact page", () => {
  it("submits the form and shows sending state", async () => {
    const sendMock = vi.mocked(emailjs.send)
    const toastMock = vi.mocked(toast)
    const deferred = createDeferred()

    sendMock.mockReturnValue(deferred.promise as Promise<EmailJSResponseStatus>)

    render(<AboutContact />)

    fireEvent.change(
      screen.getByPlaceholderText("about.form.name.placeholder"),
      { target: { value: "test@example.com" } }
    )
    fireEvent.change(
      screen.getByPlaceholderText("about.form.subject.placeholder"),
      { target: { value: "Ola" } }
    )
    fireEvent.change(
      screen.getByPlaceholderText("about.form.message.placeholder"),
      { target: { value: "Mensagem" } }
    )

    const submitButton = screen.getByRole("button", {
      name: "about.form.btn.send-email",
    })
    const form = submitButton.closest("form")
    if (!form) throw new Error("Form not found")

    fireEvent.submit(form)

    deferred.resolve()

    await waitFor(() => expect(sendMock).toHaveBeenCalled())
    await waitFor(() => expect(toastMock).toHaveBeenCalled())
  })
})
