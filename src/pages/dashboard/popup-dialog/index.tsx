import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FileUploader } from '@/components/file-uploader'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCTTAnalyzeMutation } from '@/queries/useAnalyze'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '@/components/context-provider'
import { toast } from 'sonner'
import HoverCardIcon from '@/components/reusable-hover-with-icon'

const fileSchema = z.array(
  z.any().refine((value) => value instanceof File, {
    message: 'Tệp không đúng định dạng hoặc không phải là tệp hợp lệ.',
  }),
  { message: 'Vui lòng chọn tệp.' }
)

const formSchema = z.object({
  projectName: z
    .string()
    .min(1, { message: 'Tên dự án không được để trống.' })
    .max(255, { message: 'Tên dự án không được vượt quá 255 ký tự.' }),
  numberOfGroup: z.coerce
    .number()
    .gte(1, { message: 'Số nhóm phải ít nhất là 1.' })
    .lte(5, { message: 'Số nhóm không được vượt quá 5.' }),
  groupPercentage: z.coerce
    .number()
    .gte(0, { message: 'Phần trăm nhóm không được nhỏ hơn 0.' })
    .lte(1, { message: 'Phần trăm nhóm không được lớn hơn 1.' }),
  correlationRpbis: z
    .string()
    .min(1, { message: 'Hệ số tương quan không được để trống.' }),
  questionFile: fileSchema,
  answerFile: fileSchema,
})

export type CTTAnalysisRequest = z.infer<typeof formSchema>

const correlationOptions = [
  {
    label: 'Điểm câu so với tổng điểm bài',
    value: 'item-total-correlation',
  },
  {
    label: 'Điểm câu so với tổng điểm bài (loại trừ điểm câu)',
    value: 'item-total-excluded',
  },
  {
    label: 'Điểm câu so với tổng điểm đã hiệu chỉnh (Iteman)',
    value: 'item-total-adjusted-iteman',
  },
]

export function PopupDialog() {
  const navigate = useNavigate()
  const cttAnalyzeMutation = useCTTAnalyzeMutation()
  const { setHasCreatedAnalysis } = useApp()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      projectName: '',
      numberOfGroup: 5,
      groupPercentage: 0.27,
      correlationRpbis: 'item-total-correlation',
    },
  })

  const handleSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      if (cttAnalyzeMutation.isPending) return
      try {
        const res = await cttAnalyzeMutation.mutateAsync(values)
        const id = res.data
        setHasCreatedAnalysis(true)
        navigate(`/analysis/${id}`)
        toast(res.message)
        // reset()
      } catch (error) {
        console.error(error)
      }
    },
    (error) => console.error(error)
  )

  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Tạo phân tích</DialogTitle>
        <VisuallyHidden.Root>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </VisuallyHidden.Root>
      </DialogHeader>
      <ScrollArea className="max-h-[600px] px-2">
        <Form {...form}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col justify-between gap-3"
          >
            <div className="h-full space-y-4 px-1">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Project</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên dự án"
                        {...field}
                        className={
                          form.formState.errors.projectName
                            ? 'border-red-500 !ring-0'
                            : ''
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfGroup"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex gap-1">
                      Số nhóm thí sinh
                      <HoverCardIcon size={11}>
                        Tên dự án là tên gợi nhớ cho dự án của bạn
                      </HoverCardIcon>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập số lượng nhóm thí sinh (1-5)"
                        min={1}
                        max={5}
                        step={1}
                        {...field}
                        className={
                          form.formState.errors.numberOfGroup
                            ? 'border-red-500 !ring-0'
                            : ''
                        }
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1">
                      Tỷ lệ nhóm cao, nhóm thấp
                      <HoverCardIcon size={11}>
                        Tên dự án là tên gợi nhớ cho dự án của bạn
                      </HoverCardIcon>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập tỉ lệ (0-1)"
                        min={0}
                        max={1}
                        step={0.01}
                        {...field}
                        className={
                          form.formState.errors.groupPercentage
                            ? 'border-red-500 !ring-0'
                            : ''
                        }
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correlationRpbis"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Hệ số tương quan câu-bài</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vui lòng chọn loại tương quan câu - bài" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {correlationOptions.map((option) => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="questionFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <div className="flex gap-1">
                        Upload tập câu hỏi
                        <HoverCardIcon size={11}>
                          Tên dự án là tên gợi nhớ cho dự án của bạn
                        </HoverCardIcon>
                      </div>
                      <Link
                        to="/files/template_exam.csv"
                        target="_blank"
                        download
                      >
                        <span className="cursor-pointer text-center text-[13px] text-primary-600-base hover:underline">
                          Tải file mẫu
                        </span>
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <FileUploader
                        isError={!!form.formState.errors.answerFile}
                        maxFileCount={1}
                        // maxSize={4 * 1024 * 1024}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answerFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <div className="flex gap-1">
                        Upload tập kết quả
                        <HoverCardIcon size={11}>
                          Tên dự án là tên gợi nhớ cho dự án của bạn
                        </HoverCardIcon>
                      </div>
                      <Link
                        to="/files/template_result.xlsx"
                        target="_blank"
                        download
                      >
                        <span className="cursor-pointer text-center text-[13px] text-primary-600-base hover:underline">
                          Tải file mẫu
                        </span>
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <FileUploader
                        isError={!!form.formState.errors.answerFile}
                        maxFileCount={1}
                        // maxSize={4 * 1024 * 1024}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-primary-600-base font-semibold"
                disabled={cttAnalyzeMutation.isPending}
              >
                {cttAnalyzeMutation.isPending ? 'Vui lòng chờ...' : 'Phân tích'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  )
}
